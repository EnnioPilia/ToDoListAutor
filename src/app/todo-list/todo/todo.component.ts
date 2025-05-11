import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';  
import { Task } from '../task.model';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo', 
  standalone: true,  

  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',  
  styleUrls: ['./todo.component.css']  
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];  
  newTaskTitle: string = '';  
  newTaskAuthor: string = '';  
  newTaskTags: string = '';  
  
  constructor(private todoService: TodoService) {}

ngOnInit(): void {
  this.todoService.getTasks().subscribe(tasks => this.tasks = tasks);
}
  addTask(): void {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: this.newTaskTitle.trim(),
        author: this.newTaskAuthor.trim() || 'Anonymous', 
        completed: false,
        tags: this.newTaskTags.trim().split(',').map(tag => tag.trim()) 
      };
      this.todoService.addTask(newTask);
      this.newTaskTitle = '';  
      this.newTaskAuthor = '';  
      this.newTaskTags = '';    
    }
  }

  deleteTask(id: number): void {
    this.todoService.deleteTask(id);
  }

  toggleCompletion(task: Task): void {
    task.completed = !task.completed; // Toggle l'état de complétion
    this.todoService.updateTask(task); 
  }
  
  // Méthode pour le tracking des tâches par ID (optimisation)
  trackTaskById(index: number, task: Task): number {
    return task.id;
  }

  clearCompletedTasks(): void {
    this.tasks = this.tasks.filter(task => !task.completed);
    this.todoService.clearCompletedTasks(); 
        this.newTaskTitle = '';  
        this.newTaskAuthor = '';  
        this.newTaskTags = '';  
  }

  toggleAllTasks(): void {
    const areAllCompleted = this.tasks.every(task => task.completed);
    this.tasks.forEach(task => task.completed = !areAllCompleted);
  }
}
