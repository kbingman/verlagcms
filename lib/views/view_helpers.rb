class Main
  module Views
    
    module ViewHelpers
      
      def gravatar
        gravatar_id = Digest::MD5.hexdigest(self[:email].to_s.strip.downcase)
        gravatar_for_id(gravatar_id)
      end
    
      def gravatar_for_id(gid, size = 30)
        "#{gravatar_host}/avatar/#{gid}?s=#{size}"
      end
    
      def gravatar_host
        @ssl ? 'https://secure.gravatar.com' : 'http://www.gravatar.com'
      end
      
      # Returns true if the local page matches the global page
      def if_self
        @global_page.id == self[:id]
      end
      
      # Returns true if the local page matches the global page
      def if_ancestor_or_self
        local_page_id = self[:id].to_s
        ids = @global_page.ancestor_ids + [@global_page.id.to_s]
        ids.include?(local_page_id)
      end

    end
    
  end
end