import { Component } from '@angular/core';
import { Reader } from 'src/app/shared/interfaces/reader';
import { ReaderService } from 'src/app/shared/services/reader.service';

@Component({
  selector: 'app-friends-readers',
  templateUrl: './friends-readers.component.html',
  styleUrls: ['./friends-readers.component.scss']
})
export class FriendsReadersComponent {
  readerId="643d9026c9e38d96582f4528";
  currentReader: any = {
    _id: "",
    name: "",
    user: '',
    email: '',
    city: '',
    image: '',
    password: '',
    read: [],
    toBeRead: [],
    reading: [],
    friends: [],
    readingChallenge: 0
  };
  friends: any[] = [];
  filteredFriends: any[] = [];
  searchValue = '';

  constructor(private readerService: ReaderService) { }

  ngOnInit(){
    this.currentReader = {
      name: "John Doe",
      user: "johndoe",
      email: "johndoe@example.com",
      city: "New York",
      image: "https://pbs.twimg.com/media/E9WKMzwXEAQ_zt2.png",
      password: "password123",
      read: [
        { bookId: "123", finishedDate: new Date("2022-03-01") },
        { bookId: "456", finishedDate: new Date("2022-04-15") }
      ],
      toBeRead: ["789", "101112"],
      reading: [
        { bookId: "131415", progress: 30 },
        { bookId: "161718", progress: 50 }
      ],
      friends: [
        {
          name: "Jane Smith",
          user: "janesmith",
          email: "janesmith@example.com",
          city: "Los Angeles",
          image: "https://pbs.twimg.com/media/E9WKMzwXEAQ_zt2.png"
        },
        {
          name: "Bob Johnson",
          user: "bobjohnson",
          email: "bobjohnson@example.com",
          city: "Chicago",
          image: "https://pbs.twimg.com/media/E9WKMzwXEAQ_zt2.png"
        },
        {
          name: "Sarah Lee",
          user: "sarahlee",
          email: "sarahlee@example.com",
          city: "San Francisco",
          image: "https://pbs.twimg.com/media/E9WKMzwXEAQ_zt2.png"
        }
      ],
      readingChallenge: 20
    }
    this.friends = this.currentReader.friends;
    this.filteredFriends = this.currentReader.friends;
  }

  filterFriends() {
    this.filteredFriends = this.friends.filter(friend =>
      friend.name.toLowerCase().includes(this.searchValue.toLowerCase())
      || friend.user.toLowerCase().includes(this.searchValue.toLowerCase())
      || friend.email.toLowerCase().includes(this.searchValue.toLowerCase())
      || friend.city.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }


}
