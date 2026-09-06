import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/site/page-header";
import { Avatar } from "@/components/site/avatar";
import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/lib/sanity/fetch";
import { formatDate } from "@/lib/format-date";

export async function generateMetadata() {
  const t = await getTranslations("Blog");
  return { title: `${t("eyebrow")} — FETLAB` };
}

export default async function BlogPage() {
  const t = await getTranslations("Blog");
  const posts = await getPosts();

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">{t("empty")}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-border transition-colors hover:border-primary/40"
              >
                {post.coverImageUrl && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                    <Image
                      src={post.coverImageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <time className="text-xs text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </time>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-balance">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground text-pretty">
                    {post.excerpt}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {post.author && (
                    <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                      <Avatar name={post.author.name} photoUrl={post.author.photoUrl} size={28} />
                      <span className="text-sm text-muted-foreground">{post.author.name}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
