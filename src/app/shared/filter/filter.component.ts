import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

export interface FilterCriteria {
  genres: number[];
  certifications: string[];
  language: string;
  userScore: number;
  minUserVotes: number;
  runtime: number;
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() filterChange = new EventEmitter<FilterCriteria>();

  selectedGenres: number[] = [];
  selectedCertifications: string[] = [];
  selectedLanguage: string = 'en';
  userScore: number = 0;
  minUserVotes: number = 0;
  runtime: number = 0;

  genres: { name: string; id: number }[] = [
    { name: 'Action', id: 28 },
    { name: 'Adventure', id: 12 },
    { name: 'Animation', id: 16 },
    { name: 'Comedy', id: 35 },
    { name: 'Crime', id: 80 },
    { name: 'Documentary', id: 99 },
    { name: 'Drama', id: 18 },
    { name: 'Family', id: 10751 },
    { name: 'Fantasy', id: 14 },
    { name: 'History', id: 36 },
    { name: 'Horror', id: 27 },
    { name: 'Music', id: 10402 },
    { name: 'Mystery', id: 9648 },
    { name: 'Romance', id: 10749 },
    { name: 'Science Fiction', id: 878 },
    { name: 'TV Movie', id: 10770 },
    { name: 'Thriller', id: 53 },
    { name: 'War', id: 10752 },
    { name: 'Western', id: 37 }
  ];

  certifications: string[] = ['NR', 'G', 'PG', 'PG-13', 'R', 'NC-17'];

  languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' }
  ];

  onSearch() {
    const filterCriteria: FilterCriteria = {
      genres: this.selectedGenres,
      certifications: this.selectedCertifications,
      language: this.selectedLanguage,
      userScore: this.userScore,
      minUserVotes: this.minUserVotes,
      runtime: this.runtime,
    };
    
    this.filterChange.emit(filterCriteria);
  }
} 