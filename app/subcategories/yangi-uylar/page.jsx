import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>Yangi uylar | Topuy</title>
        <meta
          name="description"
          content="Yangi uylar | Uy sotib olish | ☎️ Qo’ng’iroq qiling: +(99897) 466-77-88"
        />
      </Head>
      <div className="container">
        <div className="flex flex-col my-10">
          <h1 className="text-3xl font-bold">
            Toshkentda yangi uylar va ikkilamchi bozor uylar
          </h1>
          <p>
            Agar siz yangi uylar yoki ikkilamchi bozordan uy izlayotgan
            bo‘lsangiz, <strong>Topuy.uz</strong> sayti orqali eng qulay va
            ishonchli variantlarni topishingiz mumkin. Toshkentda uy-joy bozori
            jadal rivojlanib bormoqda, shuning uchun siz uchun eng maqbul
            variantni tanlash juda muhim!
          </p>

          <h2 className="text-2xl font-semibold mt-4">
            Toshkentda uy sotib olish – eng yaxshi takliflar Topuy.uz da!
          </h2>
          <p>
            Toshkentda uy sotib olish haqida o‘ylayotgan bo‘lsangiz, sizga
            quyidagi variantlar mos kelishi mumkin:
          </p>
          <ul className="list-disc pl-5">
            <li>
              <strong>Yangi uylar</strong> – zamonaviy infratuzilma va qulay
              sharoitlarga ega kvartiralar.
            </li>
            <li>
              <strong>Ikkilamchi bozor uy</strong> – narxi nisbatan qulay va
              yaxshi ta’mirlangan xonadonlar.
            </li>
          </ul>

          <p>
            Ayniqsa, <strong>Chilonzor uy</strong> yoki{" "}
            <strong>Yunusobod uy bozori</strong> hududlarida ko‘plab foydali
            takliflar mavjud.
          </p>

          <h2 className="text-2xl font-semibold mt-4">
            Chilonzorda arenda va Toshkentda sotiladigan domlar
          </h2>
          <p>
            Agar siz uy sotib olishdan oldin vaqtincha ijara variantlarini
            o‘rganmoqchi bo‘lsangiz, <strong>Chilonzor arenda</strong> bo‘limida
            mos keladigan uylarni topishingiz mumkin. Shu bilan birga,
            Toshkentda sotiladigan domlar bo‘yicha eng so‘nggi e’lonlar doimiy
            ravishda yangilanib boradi.
          </p>

          <h2 className="text-2xl font-semibold mt-4">
            Ikkilamchi bozor ipoteka va yangi uylar bo‘lib-bo‘lib to‘lash
            imkoniyati
          </h2>
          <p>
            Ko‘pchilik uchun <strong>ikkilamchi uy ipoteka</strong> yoki{" "}
            <strong>ikkilamchi bozor ipoteka</strong> orqali uy sotib olish
            qulay yechim hisoblanadi. Shuningdek, yangi uylar{" "}
            <strong>rassrochka</strong> orqali ham qulay to‘lov shartlaridan
            foydalanishingiz mumkin.
          </p>

          <h2 className="text-2xl font-semibold mt-4">
            Nima uchun aynan Topuy.uz?
          </h2>
          <ul className="list-disc pl-5">
            <li>
              ✅ <strong>Eng so‘nggi e’lonlar</strong> – yangi va ikkilamchi uy
              bozori bo‘yicha to‘liq ma’lumot.
            </li>
            <li>
              ✅ <strong>Oson qidiruv tizimi</strong> – kerakli hudud va narx
              bo‘yicha filtrlash imkoniyati.
            </li>
            <li>
              ✅ <strong>Ishonchli sotuvchilar</strong> – faqat tasdiqlangan
              uy-joy e’lonlari.
            </li>
          </ul>

          <p className="mt-4 font-bold text-lg">
            Siz ham Toshkentda orzuingizdagi uyga ega bo‘lishni xohlaysizmi?
          </p>
          <p>
            <strong>Topuy.uz</strong> sayti orqali eng yaxshi takliflarni toping
            va hoziroq tanlovingizni qiling! 🏡
          </p>

          <p className="mt-4">
            <a href="https://topuy.uz" className="text-blue-500 underline">
              Topuy.uz
            </a>{" "}
            sayti orqali eng yaxshi uy-joy takliflarini toping va yangi
            uyingizga ega bo‘ling! 🏠
          </p>
        </div>
      </div>
    </>
  );
}
