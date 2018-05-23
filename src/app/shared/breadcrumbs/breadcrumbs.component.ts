import { Component, OnInit } from "@angular/core";
import { Router, ActivationEnd } from "@angular/router";
import "rxjs/add/operator/filter";
import { Title, Meta, MetaDefinition } from "@angular/platform-browser";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  label: string = "";

  constructor(private router: Router, public title: Title, public meta: Meta) {
    this.getDataRoute().subscribe(data => {
      console.log(data);
      this.label = data.titulo;
      title.setTitle(this.label);

      const metaTag: MetaDefinition = {
        name: "description",
        content: this.label
      };

      meta.updateTag(metaTag);
    });
  }

  getDataRoute() {
    return this.router.events
      .filter(event => event instanceof ActivationEnd)
      .filter((event: ActivationEnd) => event.snapshot.firstChild === null)
      .map((event: ActivationEnd) => event.snapshot.data);
  }

  ngOnInit() {}
}
