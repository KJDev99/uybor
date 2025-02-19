import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Arenda ofis | Topuy kompaniyasi</title>
        <meta
          name="description"
          content="Arenda ofis | Ofis arenda | ☎️ Qo’ng’iroq qiling: +(99897) 466-77-88"
        />
      </Head>
      <div className="container">
        <div className="flex flex-col my-10">
          <h1 className="text-3xl font-bold">Ofis ijarasi – Toshkentda!</h1>
          <p>
            Toshkentda <strong>arenda ofis</strong> izlayapsizmi? Biznesingiz
            uchun qulay va zamonaviy <strong>ofis ijaralarini</strong>{" "}
            <strong>Topuy.uz</strong> saytidan topishingiz mumkin. Biz sizga
            shahar markazida va boshqa strategik joylashuvlarda joylashgan
            ofislarni taklif qilamiz.
          </p>

          <h2 className="text-2xl font-semibold mt-4">
            Toshkentda arzon narxlarda ofis ijarasi – eng yaxshi tanlov faqat
            biz bilan.
          </h2>
          <ul className="list-disc pl-5">
            <li>
              🏢 <strong>Ishbilarmonlik markazida</strong> joylashgan ijaraga
              ofis turlari
            </li>
            <li>
              💼 <strong>Startaplar va kichik bizneslar</strong> uchun qulay
              ofis ijarasi
            </li>
            <li>
              🏠 <strong>Yangi ta'mirdan chiqqan</strong> va tayyor holda
              foydalanishga tayyor ofislar
            </li>
            <li>
              ⏳ <strong>Uzoq muddatli va qisqa muddatli</strong> ofis ijarasi
              imkoniyatlari
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-4">Nima uchun Topuy.uz?</h2>
          <ul className="list-disc pl-5">
            <li>
              ✅ <strong>Keng tanlov</strong> – Istalgan joylashuv va narx
              oralig‘ida ofislar
            </li>
            <li>
              ✅ <strong>Qulay shartlar</strong> – Har qanday biznesga mos
              keladigan variantlar
            </li>
            <li>
              ✅ <strong>Tezkor bron qilish</strong> – Sizga mos ofisni topib,
              tezda shartnoma tuzing
            </li>
          </ul>

          <p className="mt-4 font-bold text-lg">
            Toshkentda <strong>ofis arenda</strong> izlayotgan bo‘lsangiz, hozir{" "}
            <strong>Topuy.uz</strong> saytidan eng yaxshi takliflarni ko‘rib
            chiqing! 🚀
          </p>

          <h2 className="text-2xl font-semibold mt-4">
            Toshkentda eng yaxshi ofis arenda imkoniyatlari
          </h2>
          <ul className="list-disc pl-5">
            <li>
              📍 <strong>Istalgan lokatsiya</strong> – Yunusobod, Chilonzor,
              Yashnobod va boshqa tumanlar
            </li>
            <li>
              🏢 <strong>Shinam va ko‘rkam ofislar</strong> – Yangi va tayyor
              ishlashga mos variantlar
            </li>
            <li>
              📞 <strong>Tezkor aloqaga chiqish</strong> – Biz bilan bog‘laning
              va ofisni hoziroq band qiling!
            </li>
          </ul>

          <p className="mt-4">
            <strong>Topuy.uz</strong> sayti orqali eng yaxshi{" "}
            <strong>ofis arenda</strong> imkoniyatlarini toping! 🚀
          </p>

          <p className="mt-4">
            Hoziroq{" "}
            <a href="https://topuy.uz" className="text-blue-500 underline">
              Topuy.uz
            </a>{" "}
            saytiga tashrif buyuring va eng qulay ofis ijarasini toping! 🏢
          </p>
        </div>
      </div>
    </>
  );
}
