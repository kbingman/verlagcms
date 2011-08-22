class Main
  helpers do
    delegate :can_view?, :to => :current_user
    # helper_method :can_view? # so you can use it in your views
    # hide_action :can_view?
    
    private
      def enforce_update_permission(resource)
        logger.debug('update')
        raise Canable::Transgression unless can_update?(resource)
      end
      
      def enforce_view_permission(resource)
        logger.debug('view')
        raise Canable::Transgression unless can_view?(resource)
      end
    
  end
end