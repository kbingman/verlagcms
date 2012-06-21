object false
code(:now) { |m| (Time.now.to_f * 1000).to_i }
code(:pages) { |m| @pages }
code(:assets) { |m| @site.assets }
code(:templates) { |m| @site.templates }
code(:users) { |m| @site.users }