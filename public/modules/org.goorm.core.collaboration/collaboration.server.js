/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.goorm.org/License
 * version: 3.0.0
 * This is the module example for YUI_DOCS
 * @module collaboration
 **//**
 * This is an goorm code generator.
 * goorm starts with this code generator.
 * @class edit.server
 * @extends collaboration
 **//**
 * This presents the current browser version
 * @property sys
 **/function log(e){sys.log("[0;32m"+e+"[0m")}var sys=require("sys"),ws=require("/usr/local/lib/node_modules/websocket-server/lib/ws/server"),redis=require("/usr/local/lib/node_modules/redis-client/lib/redis-client"),user_count=0,main_store=redis.createClient(),server=ws.createServer({debug:!0});server.addListener("listening",function(){log("Listening for connections."),main_store.flushall()}),server.addListener("request",function(e,t){t.writeHead(200,{"Content-Type":"text/plain"}),t.write("Chat Server"),t.end()}),server.addListener("connection",function(e){log("opened connection: "+e.id);var t=e;e.redis_subscriber=redis.createClient(),e.redis_publisher=redis.createClient(),e.redis_subscriber.subscribeTo("*",function(t,n,r){var i='{"channel": "'+t+'", "payload": '+n+"}";log("in subscribe: "+i),e.write(i)}),e.addListener("message",function(t){log(e.id+": "+JSON.stringify(t)),message_obj=JSON.parse(t),message_obj["channel"]!=undefined&&(channel=message_obj.channel),message_obj["message"]!=undefined&&(message=message_obj.message),message_obj["identifier"]!=undefined&&(identifier=message_obj.identifier),message_obj["action"]!=undefined&&(action=message_obj.action),message_obj["user"]!=undefined?user=message_obj.user:user=this.user_id,timestamp=(new Date).getTime(),serialized_message=JSON.stringify({user:user,action:action,identifier:identifier,message:message,timestamp:timestamp,channel:channel}),channel=="chat"?action=="init"?(current_user_id=++user_count,e.user_id=current_user_id+"|@|"+user,main_store.rpush("users_"+identifier,e.user_id,function(t,n){main_store.lrange("users_"+identifier,0,-1,function(t,n){var r="";for(v in n)v!=0&&(r+=","),r+='"'+n[v]+'"';e.write('{"channel": "initial", "id":"'+e.user_id+'", "users":['+r+"] }"),main_store.lrange("chat_"+identifier,-3,-1,function(t,n){for(var r in n)e.write('{"channel": "chat_'+identifier+'", "payload": '+n[r]+"}")}),e.redis_publisher.publish("chat_"+identifier,JSON.stringify({action:"join",user:e.user_id}),function(e,t){})})}),sys.puts("user:"+e.user_id+"has joined to "+identifier+"chat room")):action=="leave"?(sys.puts("User "+e.user_id+" closing"),e.redis_publisher.publish("chat_"+identifier,JSON.stringify({action:"leave",user:e.user_id}),function(t,n){main_store.lrem("users_"+identifier,0,e.user_id,function(t,n){sys.puts("User "+e.user_id+" closed"),e.redis_publisher.close(),e.redis_subscriber.close()})})):e.redis_publisher.publish("chat_"+identifier,serialized_message,function(e,t){main_store.rpush("chat_"+identifier,serialized_message,function(e,t){while(main_store.llen()>3)main_store.lpop("chat_"+identifier)})}):channel=="edit"?action=="init"?(current_user_id=e.user_id=++user_count,e.identifier=identifier,e.channel=channel,main_store.rpush("users_"+identifier,e.user_id,function(t,n){main_store.lrange("users_"+identifier,0,-1,function(t,n){e.write('{"channel": "initial", "id":'+current_user_id+', "users":['+n+"] }"),main_store.lrange("data_"+identifier,0,-1,function(t,n){for(var r in n)e.write('{"channel": "edit","action":"change", "payload": '+n[r]+"}")})})})):action=="autoSaved"?main_store.del("data_"+identifier,function(e,t){}):action=="leave"?e.redis_publisher.publish("edit",JSON.stringify({action:"leave",user:e.user_id}),function(t,n){main_store.lrem("users_"+identifier,0,e.user_id+"",function(t,n){sys.puts("User "+e.user_id+" closed"),e.redis_publisher.close(),e.redis_subscriber.close()})}):e.redis_publisher.publish(channel,serialized_message,function(e,t){sys.puts("Published message to "+(t===0?"no one":t+" subscriber(s).")),main_store.rpush("data_"+identifier,serialized_message,function(e,t){})}):channel=="design"&&(action=="init"?(current_user_id=e.user_id=++user_count,e.identifier=identifier,e.channel=channel,main_store.rpush("users_"+identifier,e.user_id,function(t,n){main_store.lrange("users_"+identifier,0,-1,function(t,n){e.write('{"channel": "initial", "id":'+current_user_id+', "users":['+n+"] }"),main_store.lrange("data_"+identifier,0,-1,function(t,n){for(var r in n)e.write('{"channel": "design", "payload": '+n[r]+"}")}),e.redis_publisher.publish("design",JSON.stringify({action:"join",identifier:e.identifier,user:e.user_id}),function(e,t){log("join message published")})})})):action=="leave"?e.redis_publisher.publish("design",JSON.stringify({action:"leave",identifier:e.identifier,user:e.user_id}),function(t,n){main_store.lrem("users_"+identifier,0,e.user_id+"",function(t,n){sys.puts("User "+e.user_id+" closed"),e.redis_publisher.close(),e.redis_subscriber.close()})}):action=="autoSaved"?main_store.del("data_"+identifier,function(e,t){}):e.redis_publisher.publish("design",serialized_message,function(e,t){main_store.rpush("data_"+identifier,serialized_message,function(e,t){})}))})}),server.addListener("close",function(e){sys.puts("User "+e.identifier+" onClose"),e.redis_publisher.publish(e.channel,JSON.stringify({action:"leave",user:e.user_id}),function(t,n){sys.puts(t),sys.puts("Published message to "+(n===0?"no one":n+" subscriber(s).")),main_store.lrem("users_"+e.identifier,0,e.user_id,function(t,n){sys.puts("User "+e.user_id+" closed"),e.redis_publisher.close(),e.redis_subscriber.close()})}),e.redis_publisher.close(),e.redis_subscriber.close()}),server.listen(8090);