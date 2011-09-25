object false
code(:now) { |m| Time.now }
code(:pages) { |m| @site.pages }
code(:assets) { |m| @site.assets }
code(:templates) { |m| @site.templates }
code(:users) { |m| @site.users }