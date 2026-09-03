module Jekyll
  # Markdown images in post bodies (`![]()`) render as plain <img> tags with
  # no loading attribute, so every image in a post — even ones far below the
  # fold — downloads immediately. This adds loading="lazy" to all but the
  # first image in each post (the first is left eager since it's usually
  # visible without scrolling).
  Jekyll::Hooks.register :posts, :post_convert do |post|
    first = true
    post.content = post.content.gsub(/<img(?![^>]*\bloading=)([^>]*)>/) do
      attrs = $1
      if first
        first = false
        "<img#{attrs}>"
      else
        "<img loading=\"lazy\"#{attrs}>"
      end
    end
  end
end
