-- Optional seed: run after 001_products.sql. Uses ON CONFLICT to allow re-runs.

insert into public.products (id, name, price, category, description, sizes, images, featured)
values
  (
    '1',
    'Royal Embroidered Panjabi',
    3500,
    'premium',
    'Handcrafted with intricate gold thread embroidery on premium cotton fabric. Perfect for weddings and grand celebrations.',
    array['S', 'M', 'L', 'XL', 'XXL'],
    array[
      'https://i.ibb.co.com/JR4xpnZD/1.jpg',
      'https://i.ibb.co.com/6JRcDr3z/2.jpg',
      'https://i.ibb.co.com/Jwq5Sd5D/3.jpg'
    ],
    true
  ),
  (
    '2',
    'Classic White Cotton Panjabi',
    1800,
    'casual',
    'Timeless white cotton Panjabi with subtle stitching details. Breathable fabric ideal for everyday wear.',
    array['S', 'M', 'L', 'XL'],
    array[
      'https://i.ibb.co.com/QF8B9VK5/4.jpg',
      'https://i.ibb.co.com/9khFZHzq/5.jpg',
      'https://i.ibb.co.com/cXSyjD64/6.jpg'
    ],
    true
  ),
  (
    '3',
    'Festive Silk Blend Panjabi',
    4200,
    'festive',
    'Luxurious silk-cotton blend with ornamental buttons and contrast piping. A standout piece for Eid and weddings.',
    array['M', 'L', 'XL', 'XXL'],
    array[
      'https://i.ibb.co.com/XrtYM467/Gemini-Generated-Image-anw2bnanw2bnanw2.jpg',
      'https://i.ibb.co.com/N2xCFHYr/Gemini-Generated-Image-j0tqenj0tqenj0tq.jpg',
      'https://i.ibb.co.com/3y45ybtR/Gemini-Generated-Image-py8netpy8netpy8n.jpg'
    ],
    true
  ),
  (
    '4',
    'Midnight Blue Panjabi',
    2200,
    'casual',
    'Deep midnight blue with a modern slim fit. Features chest pocket and cuffed sleeves.',
    array['S', 'M', 'L', 'XL'],
    array[
      'https://i.ibb.co.com/vxSQs5X8/PR-08.jpg',
      'https://i.ibb.co.com/h1nCLynD/RO04.jpg',
      'https://i.ibb.co.com/27WLppdG/RP-01.jpg'
    ],
    false
  ),
  (
    '5',
    'Heritage Jamdani Panjabi',
    5500,
    'premium',
    'Authentic Jamdani weave Panjabi showcasing centuries-old Bengali craftsmanship.',
    array['M', 'L', 'XL'],
    array[
      'https://i.ibb.co.com/v2Vdrxw/RP-03.jpg',
      'https://i.ibb.co.com/hF32Qddt/RP-06.jpg',
      'https://i.ibb.co.com/B2K4f8Tr/RP-01.jpg'
    ],
    true
  ),
  (
    '6',
    'Olive Green Everyday Panjabi',
    1600,
    'casual',
    'Comfortable olive green cotton Panjabi with relaxed fit. Perfect for daily wear.',
    array['S', 'M', 'L', 'XL', 'XXL'],
    array[
      'https://i.ibb.co.com/whvb4fr3/RP01.jpg',
      'https://i.ibb.co.com/hFMmh166/RP-01.jpg',
      'https://i.ibb.co.com/HTSWFNYR/RP02.jpg'
    ],
    false
  ),
  (
    '7',
    'Golden Celebration Panjabi',
    4800,
    'festive',
    'Golden fabric with intricate paisley embroidery designed for special celebrations.',
    array['S', 'M', 'L', 'XL'],
    array[
      'https://i.ibb.co.com/XxmBp3Fr/RP03.jpg',
      'https://i.ibb.co.com/KzcC63f4/RP-03.jpg',
      'https://i.ibb.co.com/v47xV3vF/RP-04.jpg'
    ],
    true
  ),
  (
    '8',
    'Charcoal Linen Panjabi',
    2500,
    'casual',
    'Premium linen fabric in charcoal grey. Wrinkle-resistant and breathable.',
    array['M', 'L', 'XL', 'XXL'],
    array[
      'https://i.ibb.co.com/NnWySLtK/RP05.jpg',
      'https://i.ibb.co.com/B5crvB81/RP-05.jpg',
      'https://i.ibb.co.com/vCbdYvyT/RP06.jpg'
    ],
    false
  ),
  (
    '9',
    'Maroon Velvet Panjabi',
    6000,
    'premium',
    'Rich maroon velvet Panjabi with gold cufflinks and embroidered collar.',
    array['S', 'M', 'L', 'XL'],
    array[
      'https://i.ibb.co.com/vCkx7YqV/Rp08.jpg',
      'https://i.ibb.co.com/v6gVNHdM/Whats-App-Image-2026-03-02-at-11-55-05-PM.jpg',
      'https://i.ibb.co.com/9mfRCwQc/Whats-App-Image-2026-03-03-at-1-55-07-PM.jpg',
      'https://i.ibb.co.com/H9vM1zp/Whats-App-Image-2026-03-03-at-12-40-16-AM.jpg',
      'https://i.ibb.co.com/bjwKtNpj/Whats-App-Image-2026-03-06-at-10-31-40-PM.jpg'
    ],
    true
  )
on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  category = excluded.category,
  description = excluded.description,
  sizes = excluded.sizes,
  images = excluded.images,
  featured = excluded.featured,
  updated_at = now();
