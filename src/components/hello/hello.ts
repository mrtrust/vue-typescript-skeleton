import { Vue, Component, Prop } from "vue-property-decorator";
import Styles from './hello.scss';
import HelloHtml from './hello.html';

@Component({
  template: HelloHtml,
  style: Styles
})
export default class HelloComponent extends Vue {
  @Prop() name!: string;
  @Prop() initialEnthusiasm!: number;

  enthusiasm = this.initialEnthusiasm;

  increment() {
    this.enthusiasm++;
  }
  decrement() {
    if (this.enthusiasm > 1) {
      this.enthusiasm--;
    }
  }

  get exclamationMarks(): string {
    return Array(this.enthusiasm + 1).join('!');
  }
}
