import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service'; // Importe o UserService
import {ToastrService} from 'ngx-toastr'; // Para mostrar mensagens de sucesso/erro

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

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
        this.name = data.name
      },
      error: (err) => {
        this.toastService.error('Erro ao carregar dados do usuário!');
        console.error('Erro ao carregar dados do usuário:', err);
      }
    });

    this.userService.getAdminTest().subscribe({
      next: (data) => {
        console.log('Admin Test:', data);
        if (data.message) {
          this.toastService.success('Administrador autenticado');
        } else {
          this.toastService.error('Falha ao autenticar administrador');
        }
      },
      error: (err) => {
        this.toastService.error('Erro ao verificar administrador!');
        console.error('Erro ao verificar administrador:', err);
      }
    });
  }
}
