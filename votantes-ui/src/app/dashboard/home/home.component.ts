import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  private router = inject( Router );

  ngOnInit(): void {
    this.router.navigate(['/votantes/generales2025']);
  }

}
