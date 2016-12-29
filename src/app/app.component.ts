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
  title: string;
  name: string;
  constructor(private dataService: DataService) {
    this.dataService.getTasks().subscribe(tasks => { this.tasks = tasks; });
  }

  ngOnInit() {
  }

  addTask(): void {
    let newTask = {
      title: this.title,
      name: this.name
    };

    this.dataService.addTask(newTask).subscribe(task => {
      this.tasks.push(task);
      this.title = '';
      this.name = '';
    });
  }
}
