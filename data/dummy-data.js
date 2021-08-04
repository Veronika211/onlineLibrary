import Zanr from '../models/naslovna';
import Knjiga from '../models/knjiga';

//imamo niz objekata sa njihovim propertijima
export const ZANROVI = [
    new Zanr(1,'Biografije','#e74c3c'),
    new Zanr(2,'Istorijski','#e74c3c'),
    new Zanr(3,'Klasici','#e74c3c'),
    new Zanr(4,'Kriminalistički','#e74c3c'),
    new Zanr(5,'Ljubavni','#e74c3c'),
    new Zanr(6,'Popularna nauka','#e74c3c')
];

export const KNJIGE = [
    new Knjiga ('1',['1','6'],'Ajnštajn - njegov život i univerzum','Volter Ajzakson',
    'https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/albert-einstein-1933340-1920_ver_1.jpg',
    '670','Kako je funkcionisao Ajnštajnov um? Otkuda potiče njegova genijalnost? Ajzaksonova knjiga pokazuje kako je Ajnštajnova naučna mašta ponikla iz buntovne prirode njegove ličnosti. Ajnštajnova fascinantna priča je svedočenje o neraskidivoj vezi između kreativnosti i slobode.'),
    new Knjiga ('2',['1','6'],'Tesla - pronalazač modernog doba','Ričard Manson',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAGERRx2JIi2u18mdT_-QE4GmUIdTp0WPWQ&usqp=CAU','999','Iako je Tesla jedan od najvećih heroja u novijoj istoriji, retko kad mu se odaju počasti koje zaslužuje. Njegovi pronalasci, hrabrost i slabosti ovde su objašnjeni jasnim i pristupačnim jezikom, tako da svaki čitalac može lako da razume šta razlikuje njegove poduhvate od ostalih konkurenata i da brzo shvati da bismo bez Teslinog rada, jedva prepoznali naš svet.“ Grečen Bake, profesorka i autorka popularnih knjiga o nauci'),
    new Knjiga ('3',['2'],'Vreme smrti','Dobrica Ćosić',
    'https://www.laguna.rs/_img/korice/2407/vreme_smrti_-_knjiga_i_prerovo_ide_u_rat-dobrica_cosic_v.jpg','1230','Prvi deo ovog Ćosićevog romana-reke uvodi čitaoce u predigre Prvog svetskog rata, politička i vojna previranja u Evropi i raspoloženje srpske Vlade, vojske i naroda u trenutku opšte mobilizacije usled austrougarske objave rata. Upoznajući nas sa porodicom Katić iz Prerova, glavnim nosiocima radnje ove ratne epopeje, pisac prepliće njihove sudbine na fonu prelomnih događaja koji su određivali sudbinu srpskog naroda pre tačno sto godina: malu zemlju u srcu Balkana zahvata sveopšti ratni vihor u kojem će njeni žitelji doživeti možda najsvetlije i najtragičnije trenutke u svojoj novijoj istoriji.'),
    new Knjiga ('4',['2'],'Intelektualci','Pol Džonson',
    'https://www.laguna.rs/_img/korice/4643/intelektualci-pol_dzonson_v.jpg','970','Otkako su, u vreme prosvetiteljstva, intelektualci preuzeli od crkve ulogu pokazivanja smera – kako u moralnom smislu tako i u ljudskom ponašanju – postavljaju se pitanja: Jesu li se odgovorno poneli s preuzetom moći i u kojoj meri su mogli da budu prikladne osobe za taj zadatak? Koliko su vodeći intelektualci raznih epoha, koji su držali pridike čovečanstvu i često mu određivali sudbinu, poštovali istinu? Kako su se odnosili prema novcu? Kako su se ophodili prema članovima porodice, prema prijateljima, ljubavnim partnerima, a onda i jedni prema drugima? Može li njihov privatni život da posluži kao primer spram merila koja su postavili pred ceo svet?'),
    new Knjiga ('5',['3','5'],'Dama sa kamelijama',
    'Aleksandar Dima Sin','https://www.knjigaknjiga.com/slike/dama-kamelijama-korica.jpg','760','Pisac je došao na ideju da piše o nesrećnoj junakinji na osnovu sopstvenog iskustva sa jednom pariskom kurtizanom i roman je odmah doživeo ogroman uspeh kako u Francuskoj, tako i u svetu. Mladi provincijalac iz dobrostojeće ali konzervativne porodice Arman Dival zaljubljuje se u prelepu i preskupu parisku kurtizanu Margerit Gotje, koja je obolela od tuberkuloze i koja nošenjem belih i crvenih kamelija signalizira svojim obožavaocima da li je na raspolaganju ili ne. Krećući se u visokim aristokratskim krugovima i pošto se i sama zaljubi u Armana, odluči da odbaci prethodni život i prihvati njegovu bračnu ponudu, ali će se između njih isprečiti nepremostive socijalne prepreke, intrige i okolnosti koje će uticati na tragičan kraj ove ljubavne priče.'),
    new Knjiga ('6',['3'],'Proces','Franc Kafka',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcRD_rqU45NBI8j73wA6P7XmVlaTrbDSgcyA&usqp=CAU','780','Jozef K., perspektivni prokurista jedne velike banke, uhapšen je na svoj 30. rođendan, rano ujutro, čim je otvorio oči. Optužba nije poznata, baš kao ni to pred kojim se sudom vodi postupak i kakav će biti njegov tok. Jozefu K. saopštavaju da sud ne želi da remeti njegov uobičajeni način života, te da se on, u skladu s tim, slobodno može vratiti svakodnevnim aktivnostima. Međutim, K. se narednih dana i meseci sve više zapliće u nevidljivu mrežu svog procesa i nedokučivog suda koji ga je pokrenuo. Korak po korak, Jozef K. saznaje da „sve pripada sudu'),
    new Knjiga ('7',['3'],'Idiot','Fjodor Mihailovič Dostojevski',
    'https://www.laguna.rs/_img/korice/4432/idiot_i_tom-fjodor_mihailovic_dostojevski_v.jpg','1100','Nakon nekoliko godina provedenih u švajcarskom sanatorijumu, knez Lav Nikolajevič Miškin vraća se u Petrograd. Polako se ponovo uključuje u visoko društvo, kojim vladaju novac, moć i romantične intrige. Dobronameran i naivan, knez Miškin će se naći u ljubavnom trouglu sa mladom i lepom Aglajom Jepančinom i zloglasnom Nastasjom Filipovnom. Međutim, njegov čisto estetski doživljaj ženske lepote bez ikakve primese seksualnih želja u velikoj meri uzrokovaće drame u njihovim odnosima.'),
    new Knjiga ('8',['4'],'Deca zla','Miodrag Majić',
    'https://i.pinimg.com/736x/17/ef/ad/17efadecf4566cad4a3a1f92211e9429.jpg','890','U središtu romana Deca zla nalazi se dramatično ubistvo, a potraga za počiniocem biće samo okidač za niz drugih događaja koji će otkriti da je reč o zločinu strasti, osvete, opomene i simbolike. Kako pronaći krivca u svetu u kom je istina izobličena, a prošlost junaka utkana u njihovu sadašnjost neraskidivim nitima zla? Nikola Bobić, beogradski advokat, pokušaće da pronađe odgovor na to pitanje, ni ne sluteći da će ga odgovor zauvek promeniti.'),
    new Knjiga ('9',['5'],'Preljuba','Paulo Koeljo',
    'https://www.laguna.rs/_img/korice/2520/preljuba-paulo_koeljo_v.jpg','500','Začuđujuća priča o tome kako izgleda imati sve a biti nesrećan. Linda uvek želi više... Posle susreta sa političarem koji je nekada bio njen dečko, još pre nego što se udala i postala poštovana žena, posvećena majka i uspešna novinarka, ona se upušta se u strastvenu, opasnu i zaraznu vezu, ali sa dalekosežnim posledicama. Provokativna i intrigantna, Preljuba je roman o otkrivanju strasti u životu, o večitom pitanju nije li upravo „ova ljubav“ ona prava…'),
    new Knjiga ('10',['5'],'U potrazi za Romeom',
    'Aleksandra Poter','https://www.knjizare-vulkan.rs/files/watermark/files/images/slike_proizvoda/thumbs_w/241562_w.jpg','490','Da vas ispali dugogodišnji dečko? Da veče morate da provedete sami? Da vas idiot u sportskom automobilu celu isprska vodom iz bare? Kad se sve ovo dogodi Džulijet, pomisliće da njen ljubavni život ne može biti gori. Međutim, ni ne sumnja da će stvari uskoro postati mnogo komplikovanije... Ispostaviće se da je za volanom sportskog automobila bio njen poslovni suparnik. Džulijet zna da bi trebalo da ga se kloni, ali to nije tako lako. Zgodan, seksi i potpuno glamurozan, Sajks je čvrsto odlučio da je obori s nogu i preotme njenom dečku Vilu. Međutim, da li je sve to vredno rizika? Da li je Džulijet i Sajksu zaista suđeno, ili je njen Romeo ipak mnogo bliži kući?'),
    new Knjiga ('11',['6'],'Homo Deus','Juval Noa Harari',
    'https://covers.zlibcdn2.com/covers/books/f8/a0/9c/f8a09c709bfd57e356d28510a3c3786c.jpg','1300','Svojim jedinstvenim stilom, kojim je opčinio milione čitalaca širom sveta, Harari nam ukazuje da su ljudi uspeli ono što deluje nemoguće: da zauzdaju glad, zarazne bolesti i rat. Pretvorili su ih iz nerazumljivih i nekontrolisanih sila prirode u izazove kojima je moguće upravljati. Prvi put više ljudi umire od prevelikog unosa hrane nego od gladi; više ljudi ode s ovog sveta usled starosti nego zbog zaraznih bolesti; više ljudi počini samoubistvo nego što strada u akcijama vojnika, terorista i kriminalaca zajedno…')
]