export interface ServiceListItem {
  title: string;
  price?: string;
  list?: ServiceListItem[];
}

export interface ServiceType {
  type: string;
  list: ServiceListItem[];
}

export interface ServiceListItemWithId extends ServiceListItem {
  id: string;
  editable: boolean;
  list?: ServiceListItemWithId[];
}

export interface ServiceTypeWithId {
  type: string;
  list: ServiceListItemWithId[];
}

export interface CustomItem {
  id: string;
  groupIndex: number;
  parentItemId?: string;
  title: string;
  price: string;
}

export interface PricingState {
  prices: Record<string, string>;
  removed: string[];
  custom: CustomItem[];
}

const SERVICES_CATALOG: ServiceType[] = [
  {
    type: 'Отоларинголога',
    list: [
      {
        title: 'Консультація отоларинголога провідного спеціаліста',
        price: '950',
      },
      {
        title: 'Повторна консультація отоларинголога провідного спеціаліста',
        price: '800',
      },
      { title: 'Консультація отоларинголога', price: '800' },
      { title: 'Повторна консультація отоларинголога', price: '650' },
      {
        title: 'Консультація отоларинголога провідного спеціаліста зі знижкою',
        price: '800',
      },
      { title: 'Консультація отоларинголога зі знижкою', price: '650' },
      {
        title:
          'Тимпанометрія (визначення стану слухової труби і середнього вуха)',
        price: '350',
      },
      { title: 'Проколювання вух System 75 (з сережками)', price: '1000' },
      {
        title: 'Видалення стороннього тіла з ЛОР органів',
        list: [
          { title: 'I рівня складності', price: '800' },
          { title: 'II рівня складності', price: '1000' },
        ],
      },
      { title: 'Промивання носової порожнини по Проетцу', price: '300' },
      {
        title: 'Туалет слухового ходу (при гнійних захворюваннях вух)',
        price: '350',
      },
      { title: 'Промивання лакун мигдаликів', price: '450' },
      {
        title: 'Промивання лакун мигдаликів + фонофорез на підщелепову ділянку',
        price: '500',
      },
      {
        title: 'Вимивання сірчаного корка',
        list: [
          {
            title: '1 вухо',
            price: '450',
          },
          {
            title: '2 вуха',
            price: '550',
          },
        ],
      },
      {
        title:
          'Продування вух балоном Політцера + масаж барабанної перетинки + фонофорез лідази',
        price: '450',
      },
      { title: 'Парацентез (розріз барабанної перетинки)', price: '1400' },
      {
        title: 'Репозиція кісток носа з місцевим знечуленням',
        price: '1500',
      },
      { title: 'Забір матеріалу на гістологічне обстеження', price: '500' },
      { title: 'Видалення кист мигдалика', price: '1000' },
      { title: 'Пункція гайморової пазухи', price: '1500' },
      { title: 'Підслизова кобляційна вазотомія', price: '12500' },
    ],
  },
  {
    type: 'Косметолога',
    list: [
      {
        title: 'Гігієнічна чистка обличчя для всіх типів шкіри',
        price: '1000',
      },
      { title: 'Гіг. чистка + пілінг по типу шкіри', price: '1300' },
      { title: 'Гіг. чистка спини', price: '1600' },
      {
        title: 'Пілінги (мигдалевий / азелаїновий / відбілюючий)',
        price: '900',
      },
      {
        title: 'Серединний пілінг YELLOW PEEL (SIMILDIET Іспанія)',
        price: '1800',
      },
      { title: 'Карбоксітерапія від LAMIC', price: '1500' },
      { title: 'Серединний пілінг PRX T-33', price: '1800' },
      { title: 'Серединний пілінг PRX T-33+', price: '2100' },
      { title: 'Мікродермоабразія обличчя', price: '1200' },
      {
        title: 'Мікродермоабразія обличчя + пілінг по типу шкіри',
        price: '1600',
      },
      {
        title:
          'Догляд за обличчям ANTI-AGE з фонофорезом і ампульними сироватками',
        price: '1700',
      },
      { title: 'Процедура з екзосомами SSEDAM', price: '2400' },
      { title: 'Класичний масаж обличчя', price: '800' },
      { title: 'Ліфтинговий, лімфодренажний масаж обличчя', price: '800' },
      { title: 'Терапія мікротоками + догляд по типу шкіри', price: '1700' },
      {
        title: 'Мезотерапія волосистої частини голови Plinest (2 ml)',
        price: '5000',
      },
      {
        title: 'Мезотерапія полінуклеотидами препаратом VITARAN (2 ml)',
        price: '5000',
      },
      {
        title: 'Мезотерапія полінуклеотидами препаратом Plinest (2 ml)',
        price: '5000',
      },
      {
        title: 'Мезотерапія полінуклеотидами препаратом Plinest NEWEST (2 ml)',
        price: '5300',
      },
      {
        title:
          'Терапія Lift UP (полінуклеотиди Plinest 2 ml + пілінг MCA 35-1 ml)',
        price: '6000',
      },
      {
        title: 'Мезотерапія препаратом FILL UP (INNOAESTHETICS)',
        price: '2000',
      },
      {
        title: 'Мезотерапія препаратом HYDRO DELUXE (NEAUVIA) (2.5 ml)',
        price: '4700',
      },
      {
        title:
          'Біоревіталізація препаратом SKIN BOOSTER HA20 (2 ml), безболісний метод 5 вколів',
        price: '4300',
      },
      {
        title: 'Мезотерапія зони навколо очей препаратом REJURAN I (1 ml)',
        price: '3600',
      },
      {
        title: 'Аугментація губ INTENSE LIPS (NEAUVIA) (1x1 ml)',
        price: '6500',
      },
      {
        title: 'Плазмотерапія',
        list: [
          { title: 'обличчя', price: '1700' },
          { title: 'волосистої частини голови', price: '1400' },
          { title: 'кисті рук', price: '1200' },
          { title: 'обличчя, шия, декольте', price: '2800' },
        ],
      },
      {
        title: 'Ботулінотерапія: препарат : NEURONOX (MEDYTOX):',
        list: [
          { title: 'ділянка міжбрівʼя (16-20од.)', price: '1900-2250' },
          { title: 'чоло (36-40од.)', price: '3400-3700' },
          { title: '«гусячі лапки» (24од.)', price: '2700' },
          { title: 'пахви', price: '8000' },
        ],
      },
    ],
  },
];

const buildItemWithId = (
  item: ServiceListItem,
  id: string,
  state?: PricingState,
): ServiceListItemWithId => {
  const prices = state?.prices ?? {};
  const removed = state?.removed ?? [];

  const priceOverride = Object.prototype.hasOwnProperty.call(prices, id)
    ? prices[id]
    : item.price;

  const children = item.list
    ?.map((child, index) => buildItemWithId(child, `${id}-${index}`, state))
    .filter((child) => !removed.includes(child.id));

  return {
    id,
    title: item.title,
    price: priceOverride,
    editable: item.price !== undefined,
    list: children?.length ? children : undefined,
  };
};

export const buildServicesWithIds = (
  state?: PricingState,
): ServiceTypeWithId[] => {
  const removed = state?.removed ?? [];
  const custom = state?.custom ?? [];

  return SERVICES_CATALOG.map((service, serviceIndex) => {
    const baseList = service.list
      .map((item, itemIndex) =>
        buildItemWithId(item, `${serviceIndex}-${itemIndex}`, state),
      )
      .filter((item) => !removed.includes(item.id));

    // Custom items going into child lists of existing group headers
    const childCustomMap = new Map<string, ServiceListItemWithId[]>();
    custom
      .filter((c) => c.groupIndex === serviceIndex && !!c.parentItemId)
      .forEach((c) => {
        const arr = childCustomMap.get(c.parentItemId!) ?? [];
        arr.push({
          id: c.id,
          title: c.title,
          price: state?.prices[c.id] ?? c.price,
          editable: true,
        });
        childCustomMap.set(c.parentItemId!, arr);
      });

    // Inject child custom items into the matching parent
    const enrichedList = baseList.map((item) => {
      const extra = childCustomMap.get(item.id);
      if (!extra?.length) return item;
      return { ...item, list: [...(item.list ?? []), ...extra] };
    });

    // Root-level custom items (no parent)
    const rootCustom: ServiceListItemWithId[] = custom
      .filter((c) => c.groupIndex === serviceIndex && !c.parentItemId)
      .map((c) => ({
        id: c.id,
        title: c.title,
        price: state?.prices[c.id] ?? c.price,
        editable: true,
      }));

    return {
      type: service.type,
      list: [...enrichedList, ...rootCustom],
    };
  });
};

export const extractPrices = (
  services: ServiceTypeWithId[],
): Record<string, string> => {
  const prices: Record<string, string> = {};

  const collect = (item: ServiceListItemWithId) => {
    if (item.editable) {
      prices[item.id] = item.price ?? '';
    }
    item.list?.forEach(collect);
  };

  services.forEach((service) => service.list.forEach(collect));

  return prices;
};
