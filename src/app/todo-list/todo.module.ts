import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';   
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './todo.service';   

@NgModule({
  declarations: [TodoComponent],   
  imports: [
    CommonModule,   
    FormsModule     
  ],
  providers: [TodoService],         
  exports: [TodoComponent]        
})
export class TodoModule { }
