import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Магазин аренда | Компания Topuy</title>
        <meta
          name="description"
          content="Магазин в аренду в Узбекистане | Аренда продуктовый магазин | ☎️ Звоните сейчас: +(99897) 466-77-88"
        />
      </Head>
      <div className="container">
        <div className="flex flex-col my-10">
          <h1 className="text-3xl font-bold">
            Аренда магазина и коммерческих помещений для бизнеса: Магазины и
            торговые площади на Topuy
          </h1>
          <p>
            Ищете идеальное место для вашего бизнеса? На платформе{" "}
            <strong>Topuy</strong> представлены объявления об аренде различных
            типов магазинов.
          </p>

          <h2 className="text-2xl font-semibold mt-4">
            Аренда под цветочный магазин
          </h2>
          <p>
            Планируете открыть цветочный магазин? Мы предлагаем помещения с
            высокой проходимостью и всеми необходимыми условиями.
          </p>

          <h3 className="text-xl font-semibold mt-4">
            Аренда продуктового магазина
          </h3>
          <p>
            У нас есть лучшие предложения по аренде помещений для продуктовых
            магазинов, соответствующих санитарным нормам.
          </p>

          <h4 className="text-lg font-semibold mt-4">
            Аренда фруктового магазина
          </h4>
          <p>
            Торговые площади, идеально подходящие для продажи фруктов, с
            удобными подъездами и высоким пешеходным трафиком.
          </p>

          <h5 className="text-md font-semibold mt-4">
            Почему аренда коммерческих помещений на Topuy?
          </h5>
          <ul className="list-disc pl-5">
            <li>
              <strong>Широкий выбор:</strong> От небольших магазинов до больших
              торговых площадей.
            </li>
            <li>
              <strong>Удобный поиск:</strong> Фильтры по локации, площади и
              цене.
            </li>
            <li>
              <strong>Надежные предложения:</strong> Все объявления проходят
              проверку.
            </li>
          </ul>

          <p className="mt-4 font-bold text-lg">
            Topuy — это идеальная платформа для поиска аренды помещений под ваш
            бизнес.
          </p>
        </div>
      </div>
    </>
  );
}
