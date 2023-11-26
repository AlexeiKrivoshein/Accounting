sc create "Accounting" start=auto binpath="c:\Program Files (x86)\Accounting\Accounting.exe"
sc description "Accounting" "Домашняя бухгалтерия"
sc config "Accounting" displayname="Домашняя бухгалтерия"
sc config "Accounting" start= auto
sc config "Accounting" obj= "KRIVOSHEIN\Accounting" password= "15616"
sc failure "Accounting" actions= restart/300000/restart/300000/""/300000 reset= 86400