import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  tasks: any;
  constructor(private dataService: DataService) {
    this.dataService.getTasks().subscribe(tasks => { this.tasks = tasks; });
  }

  ngOnInit() {
  }

  myTasks() {
    console.log(this.tasks);
  }
}
