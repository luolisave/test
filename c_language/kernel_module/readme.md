programme kernel modules
========================

URLs
----
http://www.tldp.org/LDP/lkmpg/2.6/html/lkmpg.html
http://derekmolloy.ie/writing-a-linux-kernel-module-part-1-introduction/


install dependency
-------------------
centos: 
    # dnf install module-init-tools
    dnf -y install kernel-devel kernel-headers



test commands
-------------
lsmod: list loaded modules
modinfo hello-1.ko: 
insmod: insert modules
rmmod:  remove modules
dmesg:  display message printed by printk()
~~~~
insmod /lib/modules/2.6.11/kernel/fs/fat/fat.ko
or
modprobe msdos
~~~~

sample command
~~~~
insmod /home/lluo/git/test/c_language/kernel_module/hello-1.ko
rmmod /home/lluo/git/test/c_language/kernel_module/hello-1.ko
dmesg
~~~~


