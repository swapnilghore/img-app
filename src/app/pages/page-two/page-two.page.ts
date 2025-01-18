import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-two',
  templateUrl: './page-two.page.html',
  styleUrls: ['./page-two.page.scss'],
  standalone: false,
})
export class PageTwoPage implements OnInit {
  state: any
  allImages: any[] = [];
  displayImages: {imageUrl: string }[] = [];
  batchSize = 5; 
  currentIndex = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    const data = history.state.data;
    console.log(data); 
    this.allImages = data
    this.loadMoreImages();
  }

  loadMoreImages(event?: any) {
    console.log(event);
    const nextIndex = this.currentIndex + this.batchSize;
    console.log(nextIndex);
    const newImages = this.allImages.slice(this.currentIndex, nextIndex);
    console.log(newImages);
    this.displayImages = [...this.displayImages, ...newImages];
    console.log(this.displayImages);
    this.currentIndex = nextIndex;

    if (event) {
      event.target.complete();
      if (this.currentIndex >= this.allImages.length) {
        event.target.disabled = true;
      }
    }
  }


}
