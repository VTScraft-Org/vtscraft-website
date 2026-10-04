import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroComponent } from './sections/hero/hero.component';
import { StatsComponent } from './sections/stats/stats.component';
import { WorkShowcaseComponent } from './sections/work-showcase/work-showcase.component';
import { ExecutionGapComponent } from './sections/execution-gap/execution-gap.component';
import { WhyUsComponent } from './sections/why-us/why-us.component';
import { HowWeWorkComponent } from './sections/how-we-work/how-we-work.component';
import { FaqComponent } from './sections/faq/faq.component';
import { CtaComponent } from './sections/cta/cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    StatsComponent,
    WorkShowcaseComponent,
    ExecutionGapComponent,
    WhyUsComponent,
    HowWeWorkComponent,
    FaqComponent,
    CtaComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}


