import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResidentService } from '../../../shared/services/resident.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
  userId: string | null = null;
  constructor(private route: ActivatedRoute, private residentService: ResidentService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.loadUserDetails(this.userId!);
    });
  }
  loadUserDetails(id: string) {
    this.residentService.getResidentById(id).subscribe((data) => {    
    });
  }
}
