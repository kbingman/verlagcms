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
      
    end
    
  end
end