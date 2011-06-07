require "childprocess"

module Capybara
  module Zombie
    class Executer
      
      def animate!
        unless self.process
          # puts "starting zombie..."
          self.process = ChildProcess.new("env node #{executer_path}")

          stderr_reader, stderr_writer = IO::pipe
          stdout_reader, stdout_writer = IO::pipe
          self.process.io.stderr = stderr_writer
          self.process.io.stdout = stdout_writer

          self.process.start
          sleep 0.5

          stderr_writer.close
          stdout_writer.close

          begin
            raise compose_error_message(stdout_reader, stderr_reader) unless self.process.alive?
          ensure
            stdout_reader.close
            stderr_reader.close
          end
        end
      end
      
      def kill
        if self.process
          # puts "killing zombie..."
          self.process.stop if self.process.alive?
          self.process = nil
          sleep 0.5
        end
      end
      
    protected
      
      attr_accessor :process
      
      def executer_path
        @executer_path ||= File.join(File.expand_path(File.dirname(__FILE__)), "executer.js")
      end

      def compose_error_message(stdout_reader, stderr_reader)
        <<ERR
Zombie is not running.
executer.js died with exit code #{self.process.exit_code}

--- start of process STDOUT ---
#{stdout_reader.readlines.join}
--- end of process STDOUT ---


--- start of process STDERR ---
#{stderr_reader.readlines.join}
--- end of process STDERR ---
ERR
      end
      
    end
  end
end
