This is a usability prototype for **AWSMfinder**.

AWSMfinder is a lightweight, youth facing platform that allows teens
to connect with interest-linked educational opportunities across
New York City, allows out-of-school educational organizations a
centralized place to promote their programs, and gives parents,
educators and mentors an up-to-date resource on learning opportunities
that they can point youth to.

The prototype currently works by "scraping" the content of Lainie's
[Mid-Winter Afterschool Programs for Teens][1] blog post, with
a tiny bit of custom markup added to aid with geolocation/geocoding.

Some things to note:

* The prototype works on the latest versions of all modern
  browsers (Firefox, Chrome, IE, Opera, Safari) as of January 2014.
  It's optimized for touch devices; works pretty well on tablets, and
  works decently on my iPhone albeit a bit cramped.

* Once you view a program's details (by tapping on a map marker and then
  tapping "details" on one of the programs listed in the tooltip), the hash
  of your URL changes, so sharing programs is easy. However, the URL hash
  doesn't capture things like the current map viewport or the current list
  of category filters (it probably should, at least when a user selects a
  "share link" button or something).

* The UX is very preliminary; needs lots of help from @iamjessklein.

* Multiple programs can be associated with one location, and
  multiple locations can be associated with one program, which makes
  UX a bit challenging. Needs help from @iamjessklein!

* The categories are super preliminary, and are determined by searching
  program descriptions for certain keywords. It's likely that the 
  categories are wrong and/or programs don't have the right categories.
  Need to talk to Hivers about this!

* For this MVP we're only looking at real-world events that can be
  placed on a map, so the one virtual one in the blog post,
  [NYC DOE Cover Design Competition][2], isn't surfaced in the prototype.

* The [Teen Tech Time with Brooklyn Public Library][3] event isn't
  currently reflected either, because the blog post says it's
  "located at one of BPL's 60 library locations". Integrating this kind
  of information from larger organizations will be [tricky][4].

<!-- Links -->

  [1]: http://hivenyc.org/2014/01/27/2014-winter-afterschool-programs-teens/
  [2]: http://hivenyc.org/2014/01/27/2014-winter-afterschool-programs-teens/#doe
  [3]: http://hivenyc.org/2014/01/27/2014-winter-afterschool-programs-teens/#bpl1
  [4]: https://source.opennews.org/en-US/learning/sane-data-updates-are-harder-you-think/
