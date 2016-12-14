socket programming
==================

https://www.tutorialspoint.com/unix_sockets/socket_server_example.htm

files
------
single.c  single connection server
multi.c   multi connection server
client.c  client side program


compile
--------
gcc single.c -o single.o
gcc multi.c -o  multi.o
gcc client.c -o client.o


netcat test (simulate client)
------------------------------
echo -n "GET / HTTP/1.0\r\n\r\n" | nc localhost 5001
