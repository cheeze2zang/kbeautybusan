#!/bin/bash
API="https://kbeauty-busan.vercel.app/api/reviews"

post() {
  curl -s -X POST "$API" -H "Content-Type: application/json" -d "$1" > /dev/null
  echo "  -> posted"
}

echo "=== Seeding reviews ==="

# 1. HT HealingTouch Care
echo "ht-healingtouch-care"
post '{"businessSlug":"ht-healingtouch-care","reviewerName":"Emma L.","rating":5,"comment":"Best massage in Busan! The pressure was perfect and the staff were so friendly. Walking distance from Haeundae Beach. Highly recommend the face + foot combo.","language":"en"}'
post '{"businessSlug":"ht-healingtouch-care","reviewerName":"박지영","rating":4,"comment":"해운대 근처에서 마사지 받기 좋은 곳이에요. 가격도 합리적이고 분위기가 차분합니다. 대기할 때 차도 제공해주셔서 좋았어요.","language":"ko"}'
post '{"businessSlug":"ht-healingtouch-care","reviewerName":"山田太郎","rating":5,"comment":"韓国式マッサージを初めて体験しました。圧力が絶妙で、とてもリラックスできました。スタッフの方も親切でした。","language":"ja"}'
post '{"businessSlug":"ht-healingtouch-care","reviewerName":"Mike R.","rating":4,"comment":"Simple parlour but excellent massage. Good value at 55,000 won for 80 mins. Staff don'\''t speak much English but very accommodating.","language":"en"}'

# 2. Spa 1899 Donginbi
echo "spa-1899-donginbi-haeundae"
post '{"businessSlug":"spa-1899-donginbi-haeundae","reviewerName":"Jessica K.","rating":5,"comment":"The red ginseng facial was incredible! My skin felt amazing for days after. The foot bath overlooking Haeundae Beach was a bonus. Worth every won.","language":"en"}'
post '{"businessSlug":"spa-1899-donginbi-haeundae","reviewerName":"이수진","rating":5,"comment":"홍삼 향이 너무 좋고 마사지사가 매우 전문적이에요. 어깨 뭉침이 완전히 풀렸습니다. 해운대 오션뷰와 함께하는 족욕도 최고!","language":"ko"}'
post '{"businessSlug":"spa-1899-donginbi-haeundae","reviewerName":"陈小红","rating":5,"comment":"红参护理非常独特，皮肤感觉焕然一新。环境优雅，服务专业。价格偏高但物有所值。","language":"zh"}'
post '{"businessSlug":"spa-1899-donginbi-haeundae","reviewerName":"田中美咲","rating":4,"comment":"韓国の紅参を使ったスパは初めてでした。香りがとても良く、お肌がしっとりしました。少し高いですが特別な体験です。","language":"ja"}'

# 3. Haesol Beauty Gwangbok
echo "haesol-beauty-gwangbok"
post '{"businessSlug":"haesol-beauty-gwangbok","reviewerName":"Rachel T.","rating":5,"comment":"Best head spa in Busan! The scalp analysis was fascinating and the treatment was incredibly relaxing. Staff were warm and professional. Almost fell asleep!","language":"en"}'
post '{"businessSlug":"haesol-beauty-gwangbok","reviewerName":"김하늘","rating":5,"comment":"두피 분석 후 맞춤 관리를 받았는데 정말 시원하고 개운했어요. 1:1 프라이빗 룸이라 편안하게 받을 수 있었습니다. 롯데백화점 안이라 접근성도 좋아요.","language":"ko"}'
post '{"businessSlug":"haesol-beauty-gwangbok","reviewerName":"Sophie M.","rating":5,"comment":"The premium head spa was worth every penny. 12-step treatment left my hair feeling amazing. The private room and warm steamer were so luxurious.","language":"en"}'
post '{"businessSlug":"haesol-beauty-gwangbok","reviewerName":"佐藤花子","rating":4,"comment":"頭皮ケアがとても気持ちよかったです。プライベートルームで落ち着いて施術を受けられました。ロッテ百貨店内なので買い物ついでに便利です。","language":"ja"}'

# 4. Seomyeon Head Spa
echo "seomyeon-head-spa"
post '{"businessSlug":"seomyeon-head-spa","reviewerName":"Tom W.","rating":4,"comment":"Great value for money! Only 35,000 won for a proper scalp spa. The scalp analysis was a nice touch. Staff spoke enough English to communicate.","language":"en"}'
post '{"businessSlug":"seomyeon-head-spa","reviewerName":"정윤아","rating":5,"comment":"서면에서 가성비 좋은 헤드스파를 찾는다면 여기 추천! 두피 분석도 해주고 목과 어깨까지 풀어줘서 정말 개운해요.","language":"ko"}'
post '{"businessSlug":"seomyeon-head-spa","reviewerName":"David C.","rating":4,"comment":"Affordable head spa near Seomyeon station. The treatment included neck and shoulder work too. Very relaxing after a long day of sightseeing.","language":"en"}'

# 5. Miul Dermatology
echo "miul-dermatology-centum"
post '{"businessSlug":"miul-dermatology-centum","reviewerName":"Jennifer P.","rating":5,"comment":"Had laser toning done here. The dermatologist was very thorough with consultation. Private room treatment was comfortable. Skin looked noticeably brighter after.","language":"en"}'
post '{"businessSlug":"miul-dermatology-centum","reviewerName":"최민정","rating":5,"comment":"센텀시티에 위치한 전문 피부과. 1인실에서 편안하게 시술 받았어요. 써마지FLX 공식 병원이라 믿음이 갑니다.","language":"ko"}'
post '{"businessSlug":"miul-dermatology-centum","reviewerName":"王丽","rating":4,"comment":"专业的皮肤科诊所，医生很有经验。激光治疗后皮肤明显改善。私人诊疗室很舒适。","language":"zh"}'

# 6. Tox&Fill
echo "toxnfill-busan-seomyeon"
post '{"businessSlug":"toxnfill-busan-seomyeon","reviewerName":"Amy H.","rating":4,"comment":"Got jaw botox here. Very affordable compared to Seoul prices. Quick procedure, professional staff. Results kicked in after about a week.","language":"en"}'
post '{"businessSlug":"toxnfill-busan-seomyeon","reviewerName":"이서연","rating":5,"comment":"서면역에서 바로 앞이라 접근성 최고. 보톡스 가격이 합리적이고 시술도 빠르고 깔끔해요. 전국 체인이라 시스템이 잘 잡혀있어요.","language":"ko"}'
post '{"businessSlug":"toxnfill-busan-seomyeon","reviewerName":"Lisa M.","rating":4,"comment":"Transparent pricing which I appreciated. The filler results look very natural. Clean clinic right at Seomyeon station.","language":"en"}'

# 7. ChocoBusy Nail
echo "chocobusy-nail-haeundae"
post '{"businessSlug":"chocobusy-nail-haeundae","reviewerName":"Katie B.","rating":5,"comment":"Over 2000 gel colors to choose from! The nail art was stunning. They showed me examples on an iPad and nailed it perfectly. English-speaking staff made it easy.","language":"en"}'
post '{"businessSlug":"chocobusy-nail-haeundae","reviewerName":"박소현","rating":5,"comment":"해운대 네일은 여기가 최고! 색상 종류가 정말 많고 아트 실력이 뛰어나요. 예약 없이 갔는데 네일리스트가 10명이라 바로 받을 수 있었어요.","language":"ko"}'
post '{"businessSlug":"chocobusy-nail-haeundae","reviewerName":"鈴木美月","rating":5,"comment":"韓国ネイルアートの技術がすごい！スタッフが日本語で対応してくれて安心でした。色の種類が豊富で選ぶのが楽しかったです。","language":"ja"}'
post '{"businessSlug":"chocobusy-nail-haeundae","reviewerName":"张美玲","rating":4,"comment":"美甲设计非常漂亮，颜色选择超多。店面干净整洁，技师很专业。推荐韩式美甲爱好者来这里！","language":"zh"}'

# 8. Salon de Won
echo "salon-de-won"
post '{"businessSlug":"salon-de-won","reviewerName":"Alex T.","rating":5,"comment":"Won is an incredible stylist! He explained everything about hair care and styled my hair perfectly. Best haircut I have ever had in Korea. The consultation was so thorough.","language":"en"}'
post '{"businessSlug":"salon-de-won","reviewerName":"정다은","rating":5,"comment":"원장님이 정말 실력이 좋으세요. 얼굴형에 맞는 스타일 추천해주시고 관리 방법까지 알려주셔서 감동. 서면에서 미용실 찾는 분들 강추!","language":"ko"}'
post '{"businessSlug":"salon-de-won","reviewerName":"Maria G.","rating":5,"comment":"Found this on Creatrip and it was the best decision! Won speaks great English and really listens to what you want. Even got snacks and drinks during the treatment.","language":"en"}'

# 9. TwoTwo Hair
echo "twotwo-hair-salon"
post '{"businessSlug":"twotwo-hair-salon","reviewerName":"Hannah J.","rating":5,"comment":"Finally a salon in Haeundae that understands Western hair! The stylist spoke fluent English and gave me the perfect K-style cut. Very reasonable price too.","language":"en"}'
post '{"businessSlug":"twotwo-hair-salon","reviewerName":"이지은","rating":4,"comment":"해운대역 근처라 찾기 쉽고, 외국인 손님이 많아서 그런지 소통이 편해요. 디지털 펌 결과가 자연스럽고 예뻤어요.","language":"ko"}'
post '{"businessSlug":"twotwo-hair-salon","reviewerName":"Chris P.","rating":4,"comment":"Great communication, fair prices. The color job was excellent and they used quality products. Conveniently located near the metro.","language":"en"}'

# 10. InTheSun Makeup
echo "inthesun-makeup-jeonpo"
post '{"businessSlug":"inthesun-makeup-jeonpo","reviewerName":"Emily W.","rating":5,"comment":"12 years of experience really shows! Got wedding makeup done and looked absolutely stunning. The K-beauty style was exactly what I wanted.","language":"en"}'
post '{"businessSlug":"inthesun-makeup-jeonpo","reviewerName":"김유진","rating":5,"comment":"프로필 촬영 메이크업 받았는데 정말 자연스럽고 예쁘게 해주셨어요. 12년 경력 아티스트답게 손이 빠르고 정확합니다.","language":"ko"}'
post '{"businessSlug":"inthesun-makeup-jeonpo","reviewerName":"Yuki S.","rating":4,"comment":"K-beautyメイクをしていただきました。自然で美しい仕上がりに大満足です。カカオトークで予約できて便利でした。","language":"ja"}'

# 11. Yeonwol Tattoo
echo "yeonwol-tattoo-busan"
post '{"businessSlug":"yeonwol-tattoo-busan","reviewerName":"James R.","rating":5,"comment":"Flew from Tokyo specifically for Heoyeon. The fine-line work is unbelievable! He was so patient and gentle. The design turned out even better than I imagined.","language":"en"}'
post '{"businessSlug":"yeonwol-tattoo-busan","reviewerName":"박현우","rating":5,"comment":"파인라인 타투 전문가! 디자인 상담부터 시술까지 정말 꼼꼼하고 친절해요. 통증도 적고 결과물이 작품 수준입니다.","language":"ko"}'
post '{"businessSlug":"yeonwol-tattoo-busan","reviewerName":"Sarah K.","rating":5,"comment":"Got my first tattoo here and couldn'\''t have asked for a better experience. Heoyeon made me feel so comfortable. The studio is clean and cool.","language":"en"}'
post '{"businessSlug":"yeonwol-tattoo-busan","reviewerName":"刘思涵","rating":5,"comment":"从上海专程来的，极细线条纹身做得非常精致。艺术家很有耐心，设计完美。强烈推荐！","language":"zh"}'

# 12. Shinsegae Spa Land
echo "shinsegae-spaland-centum"
post '{"businessSlug":"shinsegae-spaland-centum","reviewerName":"Daniel K.","rating":5,"comment":"Korea'\''s best jjimjilbang! 13 themed saunas, natural hot springs, outdoor foot bath. Spent the whole day for just 22,000 won. An absolute must-visit in Busan.","language":"en"}'
post '{"businessSlug":"shinsegae-spaland-centum","reviewerName":"최은서","rating":5,"comment":"부산 오면 꼭 가야 할 곳! 신세계 백화점 안에 있어서 쇼핑 후 피로 풀기 딱 좋아요. 22개 온천과 13개 사우나 구경하는 재미도 쏠쏠.","language":"ko"}'
post '{"businessSlug":"shinsegae-spaland-centum","reviewerName":"Sophie L.","rating":5,"comment":"Even visited on a Saturday and it wasn'\''t crowded! The pyramid sauna and ice room are must-tries. Best value spa experience in all of Korea.","language":"en"}'
post '{"businessSlug":"shinsegae-spaland-centum","reviewerName":"中村健太","rating":5,"comment":"韓国最高のチムジルバン！天然温泉が22種類もあり、サウナも13種類。1日中楽しめて22,000ウォンは信じられない安さです。","language":"ja"}'

# 13. Gowunsesang Dermatology
echo "gowunsesang-dermatology"
post '{"businessSlug":"gowunsesang-dermatology","reviewerName":"Linda C.","rating":5,"comment":"Two board-certified dermatologists with 40+ years experience. The consultation was incredibly thorough. Laser toning results were visible immediately.","language":"en"}'
post '{"businessSlug":"gowunsesang-dermatology","reviewerName":"장서윤","rating":5,"comment":"김양제 원장님 기미 치료 후기! 3회차인데 확실히 밝아졌어요. 1:1 상담이 꼼꼼하고 영어 상담도 가능해서 외국인 친구도 데려갔습니다.","language":"ko"}'
post '{"businessSlug":"gowunsesang-dermatology","reviewerName":"Mark S.","rating":4,"comment":"Found this clinic on Creatrip. English consultation was available and the doctor explained everything clearly. Acne scar treatment showed good improvement.","language":"en"}'

# 14. Grace Dermatology
echo "grace-dermatology-haeundae"
post '{"businessSlug":"grace-dermatology-haeundae","reviewerName":"Jennifer M.","rating":5,"comment":"Got Ultherapy here. The VIP private room was so comfortable. Doctor was very experienced and the results are amazing. Skin feels tighter and more lifted.","language":"en"}'
post '{"businessSlug":"grace-dermatology-haeundae","reviewerName":"오서현","rating":4,"comment":"해운대 L타워 10층에 위치한 깔끔한 피부과. 써마지 튠페이스 받았는데 통증 관리도 잘 해주시고 결과도 만족스러워요. VIP룸이 쾌적합니다.","language":"ko"}'
post '{"businessSlug":"grace-dermatology-haeundae","reviewerName":"Lisa W.","rating":5,"comment":"The Juvelook skin booster treatment gave my skin an incredible glow. Professional staff, clean facility, and the evening hours on Tue/Fri are convenient.","language":"en"}'

# 15. Renewme Skin Clinic
echo "renewme-skin-clinic-seomyeon"
post '{"businessSlug":"renewme-skin-clinic-seomyeon","reviewerName":"Anna P.","rating":4,"comment":"Right at Seomyeon Station Exit 9, super convenient. The acne treatment program worked well for my skin. You can choose male or female doctor which I appreciated.","language":"en"}'
post '{"businessSlug":"renewme-skin-clinic-seomyeon","reviewerName":"한소희","rating":4,"comment":"서면역 바로 앞이라 접근성 최고. 피부 재생 레이저 받았는데 다운타임이 적고 효과가 좋았어요. 월금 야간진료도 편리합니다.","language":"ko"}'
post '{"businessSlug":"renewme-skin-clinic-seomyeon","reviewerName":"Kevin L.","rating":4,"comment":"Part of a well-known chain across Korea. Scar revision treatment over 3 sessions showed real improvement. Evening hours on Mon/Fri are great for working people.","language":"en"}'

# 16. JRYN Clinic
echo "jryn-clinic-seomyeon"
post '{"businessSlug":"jryn-clinic-seomyeon","reviewerName":"Michelle K.","rating":4,"comment":"Found this on Gangnam Unni app. The lifting treatment was very effective and priced competitively. The doctor was skilled and explained every step.","language":"en"}'
post '{"businessSlug":"jryn-clinic-seomyeon","reviewerName":"이나연","rating":5,"comment":"강남언니에서 보고 방문했어요. 레이저 토닝 5회 받았는데 피부톤이 확실히 밝아졌어요. 남포동 분점도 있어서 편한 곳으로 갈 수 있어요.","language":"ko"}'
post '{"businessSlug":"jryn-clinic-seomyeon","reviewerName":"刘美华","rating":4,"comment":"价格合理，医生专业。色素治疗效果明显。诊所位于西面中心，交通便利。","language":"zh"}'

# 17. SELFI Plastic Surgery
echo "selfi-plastic-surgery"
post '{"businessSlug":"selfi-plastic-surgery","reviewerName":"Anna S.","rating":5,"comment":"Dr. Kim did an amazing job on my rhinoplasty. Natural-looking results, which is exactly what I wanted. The clinic won 1st place for nose surgery in 2023!","language":"en"}'
post '{"businessSlug":"selfi-plastic-surgery","reviewerName":"김지원","rating":5,"comment":"코성형 상담부터 수술까지 정말 만족스러웠어요. 자연스러운 결과물과 세심한 사후관리가 인상적이었습니다. 서면역 2번출구에서 도보 2분!","language":"ko"}'
post '{"businessSlug":"selfi-plastic-surgery","reviewerName":"Mika T.","rating":5,"comment":"Had double eyelid surgery here. The results look so natural that my friends couldn'\''t even tell. Recovery was smooth with great aftercare support.","language":"en"}'

# 18. SHE'S Plastic Surgery
echo "shes-plastic-surgery-nampo"
post '{"businessSlug":"shes-plastic-surgery-nampo","reviewerName":"Yuki M.","rating":5,"comment":"Dr. Kim explained everything thoroughly during consultation. My facelift results exceeded expectations. Stitches removed after 5 days with minimal bruising.","language":"en"}'
post '{"businessSlug":"shes-plastic-surgery-nampo","reviewerName":"이현주","rating":5,"comment":"24년 경력의 주름 전문 성형외과. 눈가 주름 수술 후 10살은 젊어 보인다는 말을 들었어요. 다국어 통역도 가능해서 외국인 환자도 많아요.","language":"ko"}'
post '{"businessSlug":"shes-plastic-surgery-nampo","reviewerName":"Наталья К.","rating":5,"comment":"Прилетела из Владивостока специально. Русский переводчик помог с коммуникацией. Результат подтяжки лица превзошел ожидания. Рекомендую!","language":"en"}'

# 19. DESIGN Plastic Surgery
echo "design-plastic-surgery-seomyeon"
post '{"businessSlug":"design-plastic-surgery-seomyeon","reviewerName":"Amy L.","rating":4,"comment":"Got lip filler here after seeing the clinic on Creatrip. Most staff speak English which made the process smooth. Natural-looking results with HA filler.","language":"en"}'
post '{"businessSlug":"design-plastic-surgery-seomyeon","reviewerName":"박서진","rating":4,"comment":"울쎄라 리프팅 받았어요. 서면역 바로 앞이라 위치가 좋고, 상담이 꼼꼼했습니다. 시술 후 관리 안내도 자세히 해주셨어요.","language":"ko"}'
post '{"businessSlug":"design-plastic-surgery-seomyeon","reviewerName":"Rachel H.","rating":5,"comment":"Thread lift results were excellent! The doctor was very experienced. Communication in English was no problem. Would definitely come back for more treatments.","language":"en"}'

# 20. Centum BB Clinic
echo "centumbb-clinic"
post '{"businessSlug":"centumbb-clinic","reviewerName":"Sarah J.","rating":4,"comment":"Located in Centum City, very convenient after shopping at Shinsegae. The eye surgery consultation was thorough and honest about what to expect.","language":"en"}'
post '{"businessSlug":"centumbb-clinic","reviewerName":"송미라","rating":4,"comment":"센텀시티 내에 위치해서 접근성 좋아요. 코성형 상담 받았는데 무리한 시술 권유 없이 솔직한 상담이 좋았습니다. 시설도 깔끔해요.","language":"ko"}'
post '{"businessSlug":"centumbb-clinic","reviewerName":"Kevin W.","rating":5,"comment":"Had fat grafting done and very happy with the natural results. The doctor explained the procedure well and the recovery was faster than expected.","language":"en"}'

echo "=== Done! ==="
