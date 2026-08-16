module Jekyll
  module FirstImageFilter
    def first_image(content)
      return nil if content.nil?
      match = content.match(/<img[^>]+src="([^"]+)"/)
      match ? match[1] : nil
    end
  end
end

Liquid::Template.register_filter(Jekyll::FirstImageFilter)
