import { Injectable } from '@angular/core';
import { MaterialFirebaseService } from '@material-firebase/material-firebase.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firebaseService: MaterialFirebaseService, private snackbar: MatSnackBar) { }

  createNewUser(email: string, password: string) {
    return this.firebaseService.createNewUser(email, password);
  }
  async login(email: string, password: string) {
    const result = await this.firebaseService.login(email, password)
    .then( successVal => { return email })
    .catch(( err ) => {
      let snack = this.snackbar.open(err.message , 'OK');
      snack.onAction().subscribe( () => {
        window.location.reload();
      });
    });
    return result;
  }
  
  async logout() {
    const result = await this.firebaseService.logout().then(() => {
      localStorage.removeItem('user');
    }).catch( (err) => {
      window.alert(err.message);
    });
  }
}
