import {Component} from '@angular/core';

interface BasicListItem {
  title: string;
  price?: string;
}

type ListItem = BasicListItem & {
  list?: BasicListItem[];
}
type ServiceType = {
  type: string;
  list: ListItem[];
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
        {title: 'Консультація отоларинголога провідного спеціаліста', price: '800'},
        {title: 'Повторна консультація отоларинголога провідного спеціаліста', price: '650'},
        {title: 'Консультація отоларинголога', price: '650'},
        {title: 'Повторна консультація отоларинголога', price: '550'},
        {title: 'Консультація отоларинголога провідного спеціаліста зі знижкою', price: '650'},
        {title: 'Консультація отоларинголога зі знижкою', price: '550'},
        {title: 'Тимпанометрія (визначення стану слухової труби і середнього вуха)', price: '200'},
        {title: 'Проколювання вух System 75 (з сережками)', price: '1000'},
        {
          title: 'Видалення стороннього тіла з ЛОР органів', list: [
            {title: 'I рівня складності', price: '500'},
            {title: 'II рівня складності', price: '700'},
          ]
        },
        {title: 'Промивання носової порожнини по Проетцу', price: '300'},
        {title: 'Туалет слухового ходу (при гнійних захворюваннях вух)', price: '220'},
        {title: 'Промивання лакун мигдаликів', price: '350'},
        {title: 'Промивання лакун мигдаликів + фонофорез на підщелепову ділянку', price: '400'},
        {
          title: 'Вимивання сірчаного корка', list: [
            {
              title: '1 вухо',
              price: '350'
            }, {
              title: '2 вуха',
              price: '450'
            }
          ]
        },
        {title: 'Продування вух балоном Політцера + масаж барабанної перетинки + фонофорез лідази', price: '350'},
      ]
    },
    {
      type: 'Косметолога',
      list: [
        {title: 'Гігієнічна чиста обличчя для всіх типів шкіри', price: '700'},
        {title: 'Гіг. чистка + пілінг по типу шкіри', price: '1000'},
        {title: 'Гіг. чистка спини', price: '1150'},
        {title: 'Пілінги: мигдалевий, азелаїновий, відбілюючий', price: '650'},
        {title: 'Серединний пілінг YELLOW PEEL (SIMILDIET Іспанія)', price: '1200'},
        {title: 'Серединний пілінг PRX Т-33', price: '1700'},
        {
          title: 'Догляд за обличчям ANTI-AGE з фонофорезом і ампульними сироватками (апаратна методика)',
          price: '1200'
        },
        {title: 'Класичний масаж обличчя ', price: '550'},
        {title: 'Лівтинговий, лімфодренажний масаж обличчя', price: '550'},
        {title: 'Терапія мікротоками + догляд по типу шкіри', price: '1000'},
        {title: 'Мезотерапія кисті рук (препаратами SIMILDIET Іспанія)', price: '900'},
        {title: 'Мезотерапія волосистої частини голови HAIR + REVITALIZING', price: '850'},
        {title: 'Мезотерапія препаратом FILL UP (INNOAESTHETICS)', price: '1800'},
        {title: 'Мезотерапія препаратом HYDRO DELUXE (NEAUVIA) (2.5 ml)', price: '4300'},
        {title: 'Мезотерапія зони навколо очей препаратом REJURAN 1 (1ml)', price: '3200'},
        {title: 'Аугментація губ INTENSE LIPS (NEAUVIA) (1x1 ml)', price: '5800'},
        {
          title: 'Плазмотерапія', list: [
            {title: 'обличчя', price: '1700'},
            {title: 'волосистої частини голови', price: '1400'},
            {title: 'кисті рук', price: '1200'},
            {title: 'обличчя, шия, декольте', price: '2800'},
          ]
        },
        {
          title: 'Ботулінотерапія: препарат : NEURONOX (MEDYTOX):', list: [
            {title: 'ділянка міжбрівʼя (16-20од.)', price: '1880-2160'},
            {title: 'чоло (36-40од.)', price: '3280-3560'},
            {title: '«гусячі лапки» (24од.)', price: '2450'},
            {title: 'пахви', price: '10000'},
          ]
        },
      ]
    }
  ]
}
