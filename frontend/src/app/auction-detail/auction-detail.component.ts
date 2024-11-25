import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf} from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SessionComponent } from './../session.component'; // Adjust the path if needed

@Component({
  selector: 'app-auction-detail',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    JsonPipe, 
    NgFor, 
    NgIf
  ],  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css'] // Corrected from styleUrl to styleUrls
})
export class AuctionDetailComponent implements OnInit {
  auctionID: string | null = null;
  auction: any;
  data: any;
  bids: any;
  offerAmount: number = 0; // To store the offer amount

  questionText: string = '';
  answerText: string = '';
  questions: any[] = [];
  sellerInfo: any = {};  // To store seller's information

  constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder, 
      private http: HttpClient, 
      private router: Router,
      private sessionComponent: SessionComponent, 
    ) {

  }

  ngOnInit(): void {
    if (!this.sessionComponent.getUser()) {
      this.router.navigate(['/signin']);
      return;  // Ensure we return early if the user is not authenticated
    }
  
    this.data = history.state;
    console.log(this.data);
    this.offerAmount = this.data.StartingPrice;
  
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe(params => {
      this.fetchBids();
      this.fetchQuestions();
      this.getSellerInfo();
    });
  }
  
  getSellerInfo() {
    console.log("getSellerInfo executing")
    this.http.get(`http://localhost:3000/api/auction/seller-details/${this.data.AuctionID}`).subscribe({
    next: (data: any) => {
        this.sellerInfo = data;  
        console.log("sellerInfo data:", data)
    },  
    error: (error) => {
      console.error('Error fetching bids:', error);
    }
  });    
}

  fetchBids() {
    this.http.get(`http://localhost:3000/api/bids/${this.data.AuctionID}`).subscribe({
      next: (bids: any) => {
          console.log('Bids:', bids);
          this.bids = bids;
          this.updateAuctionStatuses();
      },  
      error: (error) => {
        // ... handle the error
        console.error('Error fetching bids:', error);
      }
    });    
  }

  updateAuctionStatuses() {
    this.http.post('http://localhost:3000/api/update-auctions-status', {}).subscribe({ 
      next: (response: any) => {
        console.log('Auction statuses updated:', response);
      },
      error: (error) => {
        console.error('Error updating auction statuses:', error);
      }
    });
  }
  makeOffer() {
    console.log('Offer made:', this.offerAmount);
    const user = this.sessionComponent.getUser();
    const bidderUserID = user != null ? user["userID"] : 1;

    const requestBody = {
      BidAmount: this.offerAmount,
      BidderUserID: bidderUserID, // Assuming you have BuyerID in buyerDetails
      AuctionID:  this.data.AuctionID
    };

  
    this.http.post('http://localhost:3000/api/bid', requestBody).subscribe({
      next: (response) => {
        console.log('- - - - - - - - - - - - ');
        console.log('Bid successful:', response);
        console.log('- - - - - - - - - - - - ');
        this.updateAuctionStatuses();

        // Handle successful bid, e.g., display a success message or update the UI
      },
      error: (error) => {
        console.error('Bid failed:', error);
        // Handle bid error, e.g., display an error message
      }
    });

  }
  addToCart() {

  }

  askQuestion() {
    const user = this.sessionComponent.getUser();
    const requestBody = {
      AuctionID: this.data.AuctionID,
      UserID: user ? user["userID"] : 1,
      QuestionText: this.questionText
    };

    this.http.post('http://localhost:3000/api/questions', requestBody).subscribe({
      next: (response) => {
        console.log('Question submitted successfully:', response);
        this.fetchQuestions(); // Refresh the questions list
      },
      error: (error) => {
        console.error('Error submitting question:', error);
      }
    });
  }


  fetchQuestions() {
    this.http.get(`http://localhost:3000/api/questions/${this.data.AuctionID}`).subscribe({
      next: (questions: any) => {
        this.questions = questions;
        console.log("Questions fetched:", this.questions);
        this.fetchAnswers();  // Call fetchAnswers to load answers for the questions
      },
      error: (error) => {
        console.error('Error fetching questions:', error);
      }
    });
  }

  
  fetchAnswers() {
    this.questions.forEach((question: any) => {
      this.http.get(`http://localhost:3000/api/answers/${question.QuestionID}`).subscribe({
        next: (answers: any) => {
          // Attach the fetched answers to the question
          question.Answers = answers;
          console.log(`Answers for question ${question.QuestionID}:`, answers);
        },
        error: (error) => {
          console.error(`Error fetching answers for question ${question.QuestionID}:`, error);
        }
      });
    });
  }

    answerQuestion(questionID: number) {
      const question = this.questions.find((q) => q.QuestionID === questionID);
      if (!question || !question.answerText.trim()) return; // Avoid empty answers
    
      const user = this.sessionComponent.getUser();
      const requestBody = {
        QuestionID: questionID,
        UserID: user ? user['userID'] : 1,
        AnswerText: question.answerText,
      };
    
      this.http.post('http://localhost:3000/api/answers', requestBody).subscribe({
        next: (response: any) => {
          console.log('Answer submitted successfully:', response);
    
          // Add the new answer to the corresponding question's answers array
          if (!question.Answers) {
            question.Answers = [];
          }
          question.Answers.push({
            AnswerText: requestBody.AnswerText,
            AnswerDate: new Date().toISOString(), // Adjust to match your backend format if needed
            UserID: requestBody.UserID,
          });
    
          // Clear the answer input field
          question.answerText = '';
        },
        error: (error) => console.error('Error submitting answer:', error),
      });
    }
    
  
}
