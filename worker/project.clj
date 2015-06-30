(defproject patavi.worker "0.2.5-1"
  :url "http://patavi.com"
  :license {:name "The MIT License"
            :url "http://opensource.org/licenses/MIT"
            :distribution :repo}
  :description "Workers listen for tasks and dispatch them to RServe"
  :repositories {"sonatype-nexus-snapshots" "https://oss.sonatype.org/content/repositories/snapshots"
                 "sonatype-oss-public" "https://oss.sonatype.org/content/groups/public/"
                 "drugis" "http://drugis.org/mvn"}
  :plugins [[lein-environ "0.4.0"]]
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [patavi.common "0.2.5-1"]
                 [me.raynes/fs "1.4.5"]
                 [org.rosuda/REngine "1.7.1-20130821.152906-1"]]
  :env {:rserve-logs "log/rserve.log"
        :expire-broker-after 5
        :heartbeat-interval 1000
        :initial-reconnect-interval 1000
        :maximum-reconnect-interval 32000
        :broker-socket "tcp://localhost:7740"}
  :profiles {:uberjar {:aot :all}
             :dev {:dependencies [[org.clojure/tools.namespace "0.2.4"]
                                  [org.zeromq/jeromq "0.3.4"]]}
             :production {:dependencies [[org.zeromq/jzmq "3.1.0"]]
                          :jvm-opts ["-server" "-Djava.library.path=/usr/lib:/usr/local/lib" ]}}
  :main patavi.worker.main)
