# BlackArch + Kali Linux Tools - Unified Categorized Table

## Executive Summary

| Distribution | Total Categories | Total Tools |
|--------------|-----------------|-------------|
| **Kali Linux** | 29 | ~200+ |
| **BlackArch** | 39 | ~2850 |
| **Unique (BlackArch only)** | ~25 new categories | ~2500+ unique tools |

---

## 🟣 BLACKARCH UNIQUE CATEGORIES (Not in Kali)

These categories are exclusive to BlackArch and don't have direct equivalents in Kali Linux:

| # | BlackArch Category | Tools | Description |
|---|-------------------|-------|-------------|
| 1 | `blackarch-automobile` | 4 | Automotive security (car hacking) |
| 2 | `blackarch-drone` | 4 | Drone security & analysis |
| 3 | `blackarch-ai` | 5 | AI/ML security tools |
| 4 | `blackarch-firmware` | 4 | Firmware analysis & extraction |
| 5 | `blackarch-keylogger` | 3 | Keylogging tools |
| 6 | `blackarch-packer` | 2 | Binary packing/unpacking |
| 7 | `blackarch-anti-forensic` | 2 | Anti-forensics tools |
| 8 | `blackarch-code-audit` | 30 | Source code auditing |
| 9 | `blackarch-wordlist` | 3 | Wordlist management |
| 10 | `blackarch-tunnel` | 18 | Tunneling & pivoting |
| 11 | `blackarch-honeypot` | 16 | Honeypot deployment |

---

## 🟢 SHARED CATEGORIES (Cross-Reference with Kali)

These categories exist in both Kali and BlackArch with similar tools:

| Kali Category | BlackArch Equivalent | Kali Tools | BlackArch Tools | Duplicates |
|---------------|----------------------|------------|-----------------|------------|
| kali-tools-web | blackarch-webapp | 15 | 317 | sqlmap, nikto, dirb, wpscan, gobuster, ffuf |
| kali-tools-information-gathering | blackarch-scanner | 11 | 308 | nmap, masscan, netdiscover |
| kali-tools-passwords | blackarch-cracker | 12 | 158 | john, hashcat, hydra, crunch, cewl |
| kali-tools-exploitation | blackarch-exploitation | 8 | 181 | metasploit, msfpc, veil, searchsploit |
| kali-tools-forensics | blackarch-forensic | 10 | 126 | binwalk, foremost, testdisk, autopsy |
| kali-tools-wireless | blackarch-wireless | 14 | 69 | aircrack-ng, kismet, reaver, wifite |
| kali-tools-reverse-engineering | blackarch-binary | 7 | 63 | radare2, rizin-cutter, ghidra |
| kali-tools-sniffing-spoofing | blackarch-sniffer | 14 | 39 | wireshark, ettercap, tcpdump |
| kali-tools-post-exploitation | blackarch-backdoor | 8 | 52 | mimikatz, responder |
| kali-tools-social-engineering | blackarch-social | 4 | 60 | set, beef-xss |
| kali-tools-crypto-stego | blackarch-crypto | 9 | 80 | steghide, openssl |
| kali-tools-voip | blackarch-voip | 3 | 22 | sippts, sngrep |
| kali-tools-bluetooth | blackarch-bluetooth | 6 | 26 | bluelog, bluesnarfer |
| kali-tools-database | blackarch-database | 6 | 5 | sqlmap, sqlninja |
| kali-tools-fuzzing | blackarch-fuzzer | 3 | 85 | afl, fierce |
| kali-tools-vulnerability | blackarch-scanner | 5 | 308 | nikto, openvas |
| kali-tools-reporting | blackarch-misc | 5 | 144 | faraday, dradis |
| kali-tools-windows-resources | blackarch-windows | 6 | 157 | mimikatz, crackmapexec |
| kali-tools-protect | blackarch-defensive | 5 | 44 | auditd, lynis |
| kali-tools-sdr | blackarch-radio | 5 | 30 | gqrx, rtl-sdr |
| kali-tools-rfid | blackarch-radio | 2 | 30 | proxmark3 |
| N/A | blackarch-recon | 0 | 255 | **Unique to BlackArch** |
| N/A | blackarch-automation | 0 | 109 | **Unique to BlackArch** |
| N/A | blackarch-malware | 0 | 29 | **Unique to BlackArch** |
| N/A | blackarch-proxy | 0 | 31 | **Unique to BlackArch** |
| N/A | blackarch-dos | 0 | 27 | **Unique to BlackArch** |
| N/A | blackarch-spoof | 0 | 18 | **Unique to BlackArch** |

---

## 📊 COMPLETE UNIFIED TOOL TABLE

### 1. 🔵 RECONNAISSANCE (BlackArch: 255 tools | Kali: 11 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **amass** | In-depth subdomain enumeration |
| **aquatone** | Domain flyovers tool |
| **bbot** | Multipurpose scanner for recon & bug bounties |
| **badkarma** | Advanced network reconnaissance toolkit |
| **assetfinder** | Find domains related to target |
| **altdns** | Subdomain permutation & mutation |
| **asn** | ASN, BGP, IP geolocation lookup |
| **subfinder** | Fast passive subdomain enumerator |
| **shuffledns** | Subdomain bruteforce tool |
| **fierce** | Domain DNS scanner |
| **theHarvester** | E-mail, subdomain harvester |
| **recon-ng** | Web reconnaissance framework |
| **maltego-teeth** | Offensive Maltego transforms |
| **ivre** | Network recon framework |
| **cloudmapper** | AWS enumeration tool |
| **wpscan** | WordPress vulnerability scanner |
| **whatweb** | Web technology fingerprinting |
| **wappalyzer** | Technology profiler |

**Kali Duplicate (REMOVE):** nmap, masscan, zmap, netdiscover, unicornscan, theHarvester, recon-ng

---

### 2. 🌐 WEB APPLICATION SECURITY (BlackArch: 317 tools | Kali: 15 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **arachni** | Feature-full webapp security framework |
| **0d1n** | Web security fuzzer for HTTP inputs |
| **bbqsql** | SQL injection exploit tool |
| **bbscan** | Batch web vulnerability scanner |
| **wpscan** | WordPress scanner |
| **gobuster** | Directory/DNS/cloud discovery |
| **ffuf** | Fast web fuzzer |
| **sqlmap** | SQL injection tool |
| **nikto** | Web server scanner |
| **dirb** | URL bruteforcing |
| **dirbuster** | Directory brute-forcer |
| **w3af** | Web application attack & audit framework |
| **burpsuite** | Web security testing platform |
| **hydra** | Web login brute-forcer |
| **commix** | Command injection finder |
| **xsser** | Cross-site scripting attacker |
| **atlas** | SQLmap tamper suggester |
| **jwt-tool** | JWT security testing |
| **base64dump** | Base64 extraction & decoding |

**Kali Duplicate (REMOVE):** burpsuite, sqlmap, nikto, dirb, dirbuster, wpscan, gobuster, ffuf, commix, xsser

---

### 3. 💀 EXPLOITATION (BlackArch: 181 tools | Kali: 8 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **metasploit** | Exploitation framework |
| **armitage** | Metasploit GUI |
| **msfpc** | MSFvenom payload creator |
| **veil** | AV evasion payload generator |
| **shellter** | Dynamic shellcode injection |
| **unicorn-magic** | PowerShell downgrade attack |
| **searchsploit** | Exploit-DB search |
| **getsploit** | Exploit downloader |
| **commix** | Command injection |
| **angrop** | ROP chain builder |
| **ROPgadget** | ROP gadget finder |
| **ropper** | ROP gadget chain builder |
| **one-gadget** | One-gadget RCE finder |
| **pwntools** | Exploit development framework |
| **angr** | Binary analysis platform |
| **sploitus** | Exploit search tool |
| **exploitdb** | Exploit database |
| **auto-eap** | EAP network attack |
| **aggroargs** | Buffer overflow brute-forcer |
| **bed** | Buffer overflow tester |
| **bad-pdf** | PDF NTLM stealer |
| **barq** | AWS post-exploitation |

**Kali Duplicate (REMOVE):** metasploit-framework, armitage, msfpc, veil, shellter, unicorn-magic, searchsploit, getsploit, commix

---

### 4. 🔓 PASSWORD ATTACKS (BlackArch: 158 tools | Kali: 12 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **john** | John the Ripper |
| **hashcat** | GPU password cracker |
| **hydra** | Network login cracker |
| **crunch** | Wordlist generator |
| **cewl** | Custom wordlist generator |
| **crowbar** | Brute-forcing tool |
| **ncrack** | Network auth cracker |
| **rsmangler** | Wordlist mangler |
| **maskprocessor** | Mask-based wordlist generator |
| **statsprocessor** | Markov chain wordlist |
| **pack2** | Password analysis kit |
| **asleap** | LEAP/PPTP recovery |
| **aeskeyfind** | AES key finder in RAM |
| **aesfix** | AES key recovery |
| **ares** | Automated cipher decoder |
| **adfspray** | AD password sprayer |
| **acccheck** | SMB password attack |
| **against** | SSH attack script |
| **beleth** | Multi-threaded SSH cracker |

**Kali Duplicate (REMOVE):** john, johnny, hashcat, hydra, crunch, cewl, crowbar, ncrack, rsmangler, maskprocessor, statsprocessor, pack2

---

### 5. 🔧 BINARY ANALYSIS & REVERSE ENGINEERING (BlackArch: 63 tools | Kali: 7 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **radare2** | Command-line hex editor |
| **rizin-cutter** | GUI reverse engineering |
| **ghidra** | NSA reverse engineering suite |
| **angr** | Binary analysis platform |
| **angrop** | ROP chain builder |
| **barf** | Binary analysis framework |
| **bindiff** | Binary diff tool |
| **binaryninja** | Reverse engineering platform |
| **bgrep** | Binary grep |
| **binwalk** | Binary analysis |
| **firmwalker** | Firmware analysis |
| **binwalk** | Embedded file extraction |
| **flare-qdb** | Debugger |
| **romhack** | ROM hacking toolkit |
| **peframe** | PE file analysis |
| **pestudio** | Portable executable analyzer |
| **malware-config-extractor** | Malware config extractor |
| **uncompyle6** | Python decompiler |

**Kali Duplicate (REMOVE):** radare2, rizin-cutter, ghidra, strace, ltrace, upx

---

### 6. 🔍 FORENSICS & INCIDENT RESPONSE (BlackArch: 126 tools | Kali: 10 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **autopsy** | Digital forensics GUI |
| **foremost** | File recovery |
| **testdisk** | Partition recovery |
| **photorec** | File recovery |
| **ddrescue** | Data recovery |
| **binwalk** | Binary analysis |
| **afflib** | Forensic disk format |
| **air** | Forensic imaging GUI |
| **aimage** | AFF image creation |
| **dc3dd** | Enhanced dd for forensics |
| **extundelete** | Ext3/4 recovery |
| **xhfs** | XFS forensics |
| **analyzemft** | NTFS MFT parser |
| **log2timeline** | Timeline generation |
| **plaso** | Super timeline |
| **volatility** | Memory forensics |
| **rekall** | Memory forensics |
| **bulk_extractor** | Carve files from images |
| **foremost** | Carve files |

**Kali Duplicate (REMOVE):** foremost, binwalk, autopsy, testdisk, photorec, ddrescue, dc3dd, extundelete, xhfs

---

### 7. 📶 WIRELESS SECURITY (BlackArch: 69 tools | Kali: 14 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **aircrack-ng** | Wireless WEP/WPA cracker |
| **kismet** | Wireless detector |
| **reaver** | WPS brute-forcer |
| **bully** | WPS cracker alternative |
| **wifite** | Automated wireless attack |
| **airgeddon** | Multi-use wireless script |
| **airoscript** | Aircrack-ng wrapper |
| **airpwn** | Packet injection |
| **airflood** | AP DoS tool |
| **airopy** | Wireless client/AP finder |
| **aphopper** | AP hopping |
| **auto-eap** | EAP attack tool |
| **atear** | Wireless vulnerability analyzer |
| **beholder** | Wireless IDS |
| **hostapd-wpe** | Rogue AP |
| **mdk3** | Wireless attack tool |
| **mdk4** | Advanced wireless attack |
| **cowpatty** | WPA handshake cracker |
| **wpa-supplicant** | WPA client |

**Kali Duplicate (REMOVE):** aircrack-ng, kismet, reaver, wifite, airmon-ng, airodump-ng, aireplay-ng, mdk3, mdk4

---

### 8. 🕵️ SOCIAL ENGINEERING (BlackArch: 60 tools | Kali: 4 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **set** | Social-Engineer Toolkit |
| **beef-xss** | Browser exploitation |
| **evilginx** | Phishing MITM |
| **king-phisher** | Phishing toolkit |
| **anontwi** | Anonymous Twitter/Identica |
| **social-engineer-toolkit** | SE toolkit |
| **gophish** | Open phishing framework |
| **windapsearch** | AD user enumeration |
| **mailer** | Email sender for phishing |
| **phishing-framework** | Phish creation |

**Kali Duplicate (REMOVE):** set, beef-xss, evilginx, king-phisher

---

### 9. 🕸️ NETWORK SNIFFING & SPOOFING (BlackArch: 39 tools | Kali: 14 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **wireshark** | Packet analyzer |
| **tshark** | CLI packet analyzer |
| **ettercap** | MITM framework |
| **bettercap** | Modern MITM |
| **responder** | LLMNR/NBT-NS poisoner |
| **tcpdump** | Packet sniffer |
| **netsniff-ng** | High-perf packet analyzer |
| **ncat** | Netcat alternative |
| **netcat-openbsd** | Netcat |
| **dsniff** | Sniffer suite |
| **dsniff** | Password sniffer |
| **虹** | Packet generator |
| **apacket** | SYN/backscatter sniffer |
| **above** | Protocol sniffer |

**Kali Duplicate (REMOVE):** wireshark, tshark, ettercap, bettercap, responder, tcpdump, netsniff-ng, ncat, netcat, dsniff

---

### 10. 🚪 BACKDOORS & POST-EXPLOITATION (BlackArch: 52 tools | Kali: 8 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **mimikatz** | Windows credential dumper |
| **responder** | Credential harvester |
| **crackmapexec** | Windows/AD pentest |
| **impacket** | Network protocol library |
| **smbmap** | SMB enumeration |
| **psexec** | Remote execution |
| **wmiexec** | WMI execution |
| **ldapsearch** | LDAP enumeration |
| **bloodhound** | AD analysis |
| **ad-miner** | AD audit tool |
| **adpeas** | AD privilege escalation |
| **adfind** | AD finder |
| **adidnsdump** | DNS dumping |
| **ad-ldap-enum** | LDAP enumeration |
| **adexplorersnapshot** | AD snapshot parser |
| **azurehound** | Azure data exporter |
| **koadic** | Windows post-exploit |
| **pwncat** | Post-exploit framework |
| **empire** | PowerShell C2 |
| **covenant** | .NET C2 |
| **merlin** | Cross-platform C2 |

**Kali Duplicate (REMOVE):** mimikatz, responder, crackmapexec, smbmap, empire, pwncat

---

### 11. 🔐 CRYPTOGRAPHY & STEGANOGRAPHY (BlackArch: 80 tools | Kali: 9 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **steghide** | Steganography tool |
| **stegosuite** | Steganography in images |
| **stegsnow** | ASCII whitespace stego |
| **stepic** | Python steganography |
| **stegcracker** | Stego brute-forcer |
| **gifshuffle** | GIF steganography |
| **snowdrop** | Text watermarking |
| **mat2** | Metadata removal |
| **openssl** | Crypto toolkit |
| **aespipe** | AES encryption |
| **auto-xor-decryptor** | Auto XOR decoder |
| **cyberchef** | Data transformation |
| **hash-identifier** | Hash type identifier |
| **xortool** | XOR analysis |

**Kali Duplicate (REMOVE):** steghide, stegosuite, stegsnow, stepic, stegcracker, gifshuffle, snowdrop, mat2, openssl

---

### 12. ☎️ VOIP SECURITY (BlackArch: 22 tools | Kali: 3 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **sippts** | SIP audit tools |
| **sngrep** | SIP message viewer |
| **ace** | VoIP directory enum |
| **svcrack** | VoIP login cracker |
| **svmap** | VoIP scanner |
| **enumIAX** | IAX enumeration |
| **sipvicious** | VoIP security suite |
| **rtpbreak** | RTP analysis |
| **oscanner** | VoIP scanner |

**Kali Duplicate (REMOVE):** sippts, sngrep, ace

---

### 13. 🔵 BLUETOOTH ATTACKS (BlackArch: 26 tools | Kali: 6 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **bluelog** | Bluetooth scanner |
| **bluesnarfer** | Bluetooth data stealer |
| **blueranger** | Bluetooth locator |
| **blue-hydra** | Bluetooth discovery |
| **bluez-hcidump** | HCI packet analyzer |
| **ubertooth-one** | BTLE sniffer |
| **btwle-connector** | BTLE tools |
| **btscanner** | Bluetooth scanner |

**Kali Duplicate (REMOVE):** bluelog, bluesnarfer, blueranger, blue-hydra, bluez-hcidump

---

### 14. 📡 SDR (Software Defined Radio) (BlackArch: 30 tools | Kali: 5 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **gqrx** | SDR receiver |
| **rtl-sdr** | SDR drivers |
| **hackrf** | SDR hardware |
| **airspyhf** | Airspy SDR |
| **aptdec** | APT satellite decoder |
| **uriparser** | SDR utilities |
| **kalibrate-rtl** | Frequency calibration |
| **rtlsdr-scanner** | Spectrum analyzer |
| **dump1090** | ADS-B decoder |

**Kali Duplicate (REMOVE):** gqrx, rtl-sdr, hackrf, uriparser

---

### 15. 📱 MOBILE SECURITY (BlackArch: 46 tools | Kali: 0 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **androguard** | Android analysis |
| **android-apktool** | APK decompiler/recompiler |
| **apkstudio** | APK IDE |
| **apkleaks** | APK secret scanner |
| **apkid** | APK packer identifier |
| **androwarn** | Android static analyzer |
| **androbugs** | Android vulnerability scanner |
| **backdoor-apk** | APK backdooring |
| **appmon** | Runtime security testing |
| **bandicoot** | Mobile metadata analysis |
| **androick** | Android forensics |
| **androidpincrack** | PIN bruteforce |
| **apkurlgrep** | Endpoint extraction |
| **apkstat** | APK info retrieval |
| **bagbak** | Frida-based decryptor |
| **androidmeda** | Android deobfuscation |

---

### 16. 🤖 AI/ML SECURITY (BlackArch: 5 tools | Kali: 0 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **adversarial-robustness-toolbox** | ML security library |
| **aimap** | AI/ML infrastructure scanner |

---

### 17. 🚗 AUTOMOTIVE SECURITY (BlackArch: 4 tools | Kali: 0 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **can-utils** | CAN bus utilities |
| **caringcaribou** | Automotive security |
| **canbus-tools** | CAN bus tools |

---

### 18. 🛸 DRONE SECURITY (BlackArch: 4 tools | Kali: 0 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **drone-security** | Drone security tools |
| **dronesploit** | Drone exploitation |

---

### 19. 💾 FIRMWARE ANALYSIS (BlackArch: 4 tools | Kali: 0 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **firmware-analysis-toolkit** | Firmware analysis |
| **firmwalker** | Firmware extraction |
| **binwalk** | Firmware analysis |
| **firmware-mod-kit** | Firmware modification |

---

### 20. 🔍 MALWARE ANALYSIS (BlackArch: 29 tools | Kali: 0 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **balbuzard** | Malware pattern extractor |
| **bamf-framework** | Botnet analysis platform |
| **clamav** | Antivirus scanner |
| **yara** | Pattern matching |
| **malware-config-extractor** | Config extraction |
| **pescan** | PE malware scanner |
| **peframe** | PE analysis |
| **pyinstaller-extractor** | PyInstaller extraction |
| **uncompile-pyinstaller** | PyInstaller decompile |

---

### 21. 🍯 HONEYPOTS (BlackArch: 16 tools | Kali: 0 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **beeswarm** | Honeypot deployment |
| **cowrie** | SSH/Telnet honeypot |
| **dionaea** | Network honeypot |
| **glastopf** | Web honeypot |
| **mhn** | Modern honeypot network |

---

### 22. 🔄 AUTOMATION (BlackArch: 109 tools | Kali: 0 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **apt2** | Automated penetration toolkit |
| **autopwn** | Automated exploitation |
| **autorecon** | Multi-threaded recon |
| **autonse** | NSE autosploit |
| **autosploit** | Auto exploitation |
| **automato** | Enumeration automation |
| **autonessus** | Nessus automation |
| **bashfuscator** | Bash obfuscation |
| **awsbucketdump** | S3 bucket enumerator |
| **pentest自动化脚本** | Various automation |

---

### 23. 🎭 PROXIES & TUNNELS (BlackArch: 49 tools | Kali: 0 tools)

**BlackArch Unique Tools (Proxies - 31):**
| Tool | Description |
|------|-------------|
| **3proxy** | Tiny proxy server |
| **proxychains** | Proxy chain tool |
| **proxychains-ng** | Next-gen proxychains |
| ** TOR** | Tor client |
| **proxychains** | Redirect through proxies |

**BlackArch Unique Tools (Tunnels - 18):**
| Tool | Description |
|------|-------------|
| **proxychains** | Proxy chaining |
| **proxychains-ng** | Modern proxychains |
| **sshuttle** | VPN over SSH |
| **ptunnel** | TCP over ICMP |
| **udptunnel** | UDP tunneling |

---

### 24. 💣 DOS & STRESS TESTING (BlackArch: 27 tools | Kali: 0 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **42zip** | Zip bomb |
| **hping3** | Packet generator |
| **thc-ssl-dos** | SSL DOS |
| **goldeneye** | HTTP DOS |
| **slowloris** | HTTP DOS |
| **ddoshammer** | DDoS tool |
| **tor-hammer** | Tor-based DOS |

---

### 25. 🕵️ CODE AUDIT (BlackArch: 30 tools | Kali: 0 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **bandit** | Python security linter |
| **findsecbugs** | Java security scanner |
| **brakeman** | Rails security scanner |
| **checkmarx** | Static analysis |
| **semgrep** | Code analysis |
| **sonarqube** | Code quality |

---

### 26. 🔍 FINGERPRINTING (BlackArch: 29 tools | Kali: 0 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **p0f** | OS fingerprinting |
| **xprobe2** | OS detection |
| **nmap** | Port scanner |
| **whatweb** | Web tech fingerprint |
| **wappalyzer** | Technology profiler |
| **builtwith** | Tech stack finder |
| ** retire.js** | JS library scanner |

---

### 27. 🛡️ DEFENSIVE SECURITY (BlackArch: 44 tools | Kali: 5 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **auditd** | Linux audit daemon |
| **aide** | Intrusion detection |
| **lynis** | Security hardening |
| **tiger** | Security audit |
| **samhain** | Host IDS |
| **arpon** | ARP security |
| **arpstraw** | ARP spoof detection |
| **artillery** | Blue team tool |
| **artlas** | Apache log analyzer |
| **rkhunter** | Rootkit hunter |
| **chkrootkit** | Rootkit checker |

**Kali Duplicate (REMOVE):** auditd, aide, lynis, tiger, rkhunter, chkrootkit

---

### 28. 🔧 MISCELLANEOUS (BlackArch: 144 tools | Kali: 0 tools)

**BlackArch Unique Tools:**
| Tool | Description |
|------|-------------|
| **bettercap-ui** | Bettercap Web UI |
| **archivebox** | Web archive |
| **avml** | Memory acquisition |
| **azurehound** | Azure exporter |
| **aspisec** | Log cleaner |
| **aurebeshjs** | JS obfuscation |
| **base64dump** | Base64 decoder |

---

## 📊 FINAL SUMMARY TABLE

| Category | BlackArch Tools | Kali Duplicate | Unique to BlackArch |
|----------|-----------------|---------------|---------------------|
| Reconnaissance | 255 | 10 | 245 |
| Web App Security | 317 | 10 | 307 |
| Exploitation | 181 | 8 | 173 |
| Password Attacks | 158 | 12 | 146 |
| Binary Analysis | 63 | 7 | 56 |
| Forensics | 126 | 10 | 116 |
| Wireless | 69 | 14 | 55 |
| Social Engineering | 60 | 4 | 56 |
| Sniffing/Spoofing | 39 | 14 | 25 |
| Backdoors/Post-Exploit | 52 | 8 | 44 |
| Crypto/Stego | 80 | 9 | 71 |
| VoIP | 22 | 3 | 19 |
| Bluetooth | 26 | 6 | 20 |
| SDR | 30 | 5 | 25 |
| Mobile | 46 | 0 | 46 |
| AI/ML Security | 5 | 0 | 5 |
| Automotive | 4 | 0 | 4 |
| Drone | 4 | 0 | 4 |
| Firmware | 4 | 0 | 4 |
| Malware Analysis | 29 | 0 | 29 |
| Honeypots | 16 | 0 | 16 |
| Automation | 109 | 0 | 109 |
| Proxies/Tunnels | 49 | 0 | 49 |
| DoS/Stress | 27 | 0 | 27 |
| Code Audit | 30 | 0 | 30 |
| Fingerprinting | 29 | 0 | 29 |
| Defensive | 44 | 5 | 39 |
| Miscellaneous | 144 | 5 | 139 |
| **TOTAL** | **2850** | **~120** | **~2730** |

---

## 🔧 INSTALLATION

### BlackArch Installation (Arch Linux)
```bash
# Add BlackArch repository
sudo curl -O https://blackarch.org/strap.sh
chmod +x strap.sh
sudo ./strap.sh

# Update
sudo pacman -Syu

# Install category
sudo pacman -S blackarch

# Install specific tool
sudo pacman -S nmap
sudo pacman -S metasploit
```

---

## ✅ TOOLS TO REMOVE (DUPLICATES BETWEEN KALI & BLACKARCH)

### Core Duplicates (120 tools):
- **Network:** nmap, masscan, zmap, netdiscover, unicornscan
- **Password:** john, hashcat, hydra, crunch, cewl, crowbar, ncrack
- **Exploitation:** metasploit, msfpc, veil, shellter, searchsploit
- **Web:** sqlmap, nikto, dirb, dirbuster, wpscan, gobuster, ffuf, burpsuite
- **Wireless:** aircrack-ng, kismet, reaver, wifite, mdk3, mdk4
- **Forensics:** foremost, binwalk, autopsy, testdisk, ddrescue
- **Reverse Engineering:** radare2, ghidra, strace
- **Sniffing:** wireshark, ettercap, bettercap, tcpdump, responder

*Generated from: apt-cache search kali-tools + BlackArch.org tools.html*
*Date: 2025-12-07*