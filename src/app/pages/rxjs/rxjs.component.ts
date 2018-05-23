import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/retry";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  intervalo;

  constructor() {
    this.subscription = this.regresaObservable().subscribe(
      numero => {
        console.log("subs ", numero);
      },
      error => {
        console.error("error ", error);
      },
      () => {
        console.log("el observer termino");
      }
    );
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    clearInterval(this.intervalo);
  }

  regresaObservable(): Observable<any> {
    return new Observable(observer => {
      let contador = 0;

      this.intervalo = setInterval(() => {
        contador += 1;
        const salida = {
          valor: contador
        };
        observer.next(salida);
        console.log("interval");

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
      }, 550);
    })
      .retry(2)
      .map((resp: any) => {
        return resp.valor + 1;
      })
      .filter((valor: any, index) => {
        if (valor % 2 === 0) {
          return true;
        } else {
          return false;
        }
      });
  }
}
