import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/site/avatar";
import { Prose } from "@/components/site/prose";
import { getPostBySlug } from "@/lib/sanity/fetch";
import { formatDate } from "@/lib/format-date";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, t] = await Promise.all([getPostBySlug(slug), getTranslations("Blog")]);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> {t("backToBlog")}
      </Link>

      <time className="mt-6 block text-sm text-muted-foreground">
        {formatDate(post.publishedAt)}
      </time>
      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground text-pretty">{post.excerpt}</p>

      {post.author && (
        <div className="mt-6 flex items-center gap-3">
          <Avatar name={post.author.name} photoUrl={post.author.photoUrl} size={40} />
          <div>
            <p className="text-sm font-medium">{post.author.name}</p>
            {post.author.role && (
              <p className="text-xs text-muted-foreground">{post.author.role}</p>
            )}
          </div>
        </div>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {post.coverImageUrl && (
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg border border-border">
          <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover" />
        </div>
      )}

      {post.body ? (
        <div className="mt-8">
          <Prose value={post.body} />
        </div>
      ) : null}

      {post.relatedGroup && (
        <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          {t("relatedTo")}{" "}
          <Link
            href={`/research/${post.relatedGroup.slug}`}
            className="font-medium text-foreground hover:underline"
          >
            {post.relatedGroup.title}
          </Link>
        </p>
      )}
    </article>
  );
}
