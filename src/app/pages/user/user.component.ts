import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service'; // Importe o UserService
import {ToastrService} from 'ngx-toastr'; // Para mostrar mensagens de sucesso/erro

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  name: string | null = null;

  constructor(
    private readonly userService: UserService,
    private readonly toastService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (data) => {
        console.log('Usuário:', data);
        this.name = data.name;
      },
      error: (err) => {
        this.toastService.error('Erro ao carregar dados do usuário!');
        console.error('Erro ao carregar dados do usuário:', err);
      }
    });
  }
}
