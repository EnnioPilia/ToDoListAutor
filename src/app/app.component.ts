import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './todo-list/todo/todo.component';


@Component({
  selector: 'app-root',
  imports: [TodoComponent], //RouterOutlet, 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDoListAutor';
}
