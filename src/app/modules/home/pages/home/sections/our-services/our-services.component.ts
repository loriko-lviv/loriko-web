import {Component} from '@angular/core';

type ServiceType = {
  type: string;
  list: { title: string; price: string }[];
};

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss']
})
export class OurServicesComponent {
  readonly services: ServiceType[] = [
    {
      type: 'Отоларинголога',
      list: [
        {title: 'Консультація отоларинголога провідного спеціаліста', price: '600'},
        {title: 'Консультація отоларинголога', price: '500'},
        {title: 'Повторна консультація отоларинголога', price: '500'},
        {title: 'Консультація лікаря отоларинголога зі знижкою', price: '500'},
        {title: 'Тимпанометрія (визначення стану слухової труби і середнього вуха)', price: '200'},
        {
          title: 'Консультація лікаря отоларинголога + Тимпанометрія',
          price: '700'
        },
        {title: 'Повторна консультація отоларинголога + Тимпанометрія', price: '600'},
        {title: 'Проколювання вух System 75 ( з сережками)', price: '800'},
        {title: 'Видалення стороннього тіла з ЛОР органів I рівня складності', price: '500'},
        {title: 'Видалення стороннього тіла з ЛОР органів II рівня складності', price: '700'},
        {title: 'Промивання носової порожнини по Проетцу', price: '300'},
        {title: 'Туалет слухового ходу (при гнійних захворюваннях вух)', price: '220'},
        {title: 'Промивання лакун мигдаликів', price: '350'},
        {title: 'Промивання лакун мигдаликів + фонофорез на підщелепову ділянку', price: '400'},
        {title: 'Вимивання сірчаного корка 1 вухо', price: '350'},
        {title: 'Вимивання сірчаного корка 2 вуха', price: '450'},
        {title: 'Продування вух балоном Політцера + масаж барабанної перетинки + фонофорез лідази', price: '350'},
      ]
    },
    {
      type: 'Косметолога',
      list: [
        {title: 'Консультація та підбір доглядової косметики за типом шкіри', price: '400'},
        {title: 'Гігієнічна чистка обличчя ( ультразвукова, механічна, комбінована)', price: '400'},
        {title: 'Пілінги (поверхневі, серединні, механічні)', price: '400'},
        {title: 'Доглядові процедури', price: '400'},
        {title: 'Масаж обличчя (класичний, лімфо дренажний, іспанський)', price: '400'},
        {title: 'Апаратні процедури', price: '400'},
        {title: 'Ін’єкції краси (мезотерапія та біоревіталізація)', price: '400'},
        {title: 'Ботулінотерапія верхньої третини обличчя.', price: '400'},
      ]
    }
  ]
}
