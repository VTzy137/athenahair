
import Link from "next/link";
import Icon from "@/components/Icon";
import { ICONS } from "@/lib/constants/icon";

export default function AboutPage() {
  const commitments = [
    {
      title: "Tóc 100% Remy & Virgin",
      description: "Chất lượng cao cấp, độ bền lâu dài, sợi tóc tự nhiên đồng đều.",
      icon: ICONS.star,
      badge: "Quality Guaranteed",
    },
    {
      title: "Giá cạnh tranh",
      description: "Hỗ trợ cả khách lẻ lẫn đối tác B2B với mức giá tối ưu nhất thị trường.",
      icon: ICONS.ticketVoucher,
      badge: "B2B & Retail",
    },
    {
      title: "Hàng sẵn có",
      description: "Kho hàng phong phú, sẵn sàng đóng gói và giao hàng nhanh chóng.",
      icon: ICONS.handbag,
      badge: "Fast Shipping",
    },
    {
      title: "Hỗ trợ 24/7",
      description: "Tư vấn tận tâm, sẵn sàng giải đáp mọi thắc mắc của khách hàng mọi lúc.",
      icon: ICONS.chatDots,
      badge: "Always Available",
    },
    {
      title: "Tính chuyên nghiệp",
      description: "Đội ngũ kinh nghiệm, đáp ứng hoàn hảo các đơn hàng gia công theo yêu cầu.",
      icon: ICONS.userCardId,
      badge: "Custom Orders",
    },
  ];

  return (
    <main className="relative flex w-full flex-1 flex-col overflow-hidden bg-background text-foreground">
      {/* Decorative Glow Elements */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-32 -z-10 h-80 w-80 rounded-full bg-rose-400/10 blur-3xl" />

      {/* Hero Section */}
      <section className="mx-auto flex max-w-5xl flex-col items-center px-4 pt-16 pb-12 text-center sm:pt-24 sm:pb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-pink-600 dark:text-pink-400">
          <Icon src={ICONS.mapPin} alt="Location" width={14} height={14} />
          Hà Nội, Việt Nam • 100% Remy & Virgin Hair
        </div>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">
            ATHENA HAIR
          </span>
        </h1>

        <p className="mt-4 text-xl font-medium text-foreground/90 sm:text-2xl">
          Chuyên cung cấp tóc hàng 100% Remy & Virgin từ Hà Nội
        </p>

        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Athena Hair là đơn vị hàng đầu tại Hà Nội chuyên cấp nguồn tóc extensions chất lượng cao 
          cho các thương hiệu và doanh nghiệp kinh doanh tóc tại Việt Nam và quốc tế.
        </p>

        {/* Quick Highlights Bar */}
        <div className="mt-10 grid w-full grid-cols-2 gap-4 rounded-2xl border border-border/80 bg-card/60 p-6 backdrop-blur-md sm:grid-cols-4">
          <div className="flex flex-col items-center p-2 text-center">
            <span className="text-2xl font-bold text-pink-500">100%</span>
            <span className="mt-1 text-xs text-muted-foreground">Remy & Virgin</span>
          </div>
          <div className="flex flex-col items-center p-2 text-center">
            <span className="text-2xl font-bold text-rose-500">24/7</span>
            <span className="mt-1 text-xs text-muted-foreground">Hỗ trợ tư vấn</span>
          </div>
          <div className="flex flex-col items-center p-2 text-center">
            <span className="text-2xl font-bold text-amber-500">B2B & Sỉ</span>
            <span className="mt-1 text-xs text-muted-foreground">Giá cạnh tranh</span>
          </div>
          <div className="flex flex-col items-center p-2 text-center">
            <span className="text-2xl font-bold text-emerald-500">Sẵn Có</span>
            <span className="mt-1 text-xs text-muted-foreground">Giao hàng nhanh</span>
          </div>
        </div>
      </section>

      {/* Commitments Section */}
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Chúng Tôi Cam Kết
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Tiêu chuẩn chất lượng vượt trội và dịch vụ tận tâm trong từng đơn hàng
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {commitments.map((item, idx) => (
            <div
              key={idx}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/40 hover:shadow-md ${
                idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500 transition-colors group-hover:bg-pink-500 group-hover:text-white">
                    <Icon src={item.icon} alt={item.title} width={24} height={24} />
                  </div>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground uppercase">
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-foreground group-hover:text-pink-500 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-pink-500">
                <Icon src={ICONS.circleCheck} alt="Check" width={14} height={14} />
                <span>Cam kết chính hãng</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Partner CTA Banner */}
      <section className="mx-auto w-full max-w-5xl px-4 pt-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-pink-500/30 bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-amber-500/10 p-8 sm:p-12">
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-pink-500/20 blur-2xl" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl max-w-3xl">
              Athena Hair không chỉ là nhà cung cấp, mà là đối tác tin cậy giúp phát triển kinh doanh tóc extension của bạn.
            </h2>
            
            <p className="mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground">
              Đồng hành cùng hàng trăm thương hiệu tóc chuyên nghiệp tại Việt Nam và toàn cầu.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition-all hover:scale-[1.02] hover:shadow-pink-500/40 active:scale-[0.98]"
              >
                Khám Phá Sản Phẩm
                <Icon src={ICONS.arrowRightSm} alt="Arrow Right" width={18} height={18} />
              </Link>
              <Link
                href="/settings"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-accent hover:text-accent-foreground"
              >
                Cài Đặt & Liên Hệ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

