This is a usability prototype for **AWSMfinder**.

AWSMfinder is a lightweight, youth facing platform that allows teens
to connect with interest-linked educational opportunities across
New York City, allows out-of-school educational organizations a
centralized place to promote their programs, and gives parents,
educators and mentors an up-to-date resource on learning opportunities
that they can point youth to.

The prototype currently works by "scraping" the content of Hive NYC's
[2014 Summer Programs for Youth][1] blog post, with
a tiny bit of custom markup added to aid with geolocation/geocoding.

# Quick Start

At minimum, you'll need Node 0.10. You'll also probably want a
[Google Geocoding API Key][3]; otherwise, you'll probably get
`OVER_QUERY_LIMIT` errors when the app uses that API anonymously.

To run it, do:

```
git clone https://github.com/toolness/hive-awsmfinder-prototype.git
cd hive-awsmfinder-prototype
npm install
export GOOGLE_GEOCODING_API_KEY=your-api-key-goes-here
node app.js
```

Then point your browser to http://localhost:3000/.

If for some reason the Hive NYC blog post is unreachable, or if you just
want to make development a bit faster, you can use a snapshot of the
blog post by setting the following environment variable:

```
export BLOGPOST_URL=http://localhost:3000/afterschool-programs.snapshot.html
```

# Other Notes

* The prototype works on the latest versions of all modern
  browsers (Firefox, Chrome, IE, Opera, Safari) as of June 2014.
  It's optimized for touch devices; works pretty well on tablets, and
  works decently on my iPhone albeit a bit cramped.

* Once you view a program's details (by tapping on a map marker and then
  tapping "details" on one of the programs listed in the tooltip), the hash
  of your URL changes, so sharing programs is easy. However, the URL hash
  doesn't capture things like the current map viewport or the current list
  of category filters (it probably should; or perhaps there could be a
  "share link" button that imprints the information into a URL).

* Multiple programs can be associated with one location, and
  multiple locations can be associated with one program, which makes
  UX a bit challenging.

* For this MVP we're only looking at real-world events that can be
  placed on a map, so virtual ones, like the
  [NYC DOE Cover Design Competition][2], from Winter 2014, won't be
  surfaced in the prototype.


<!-- Links -->

  [1]: http://hivenyc.org/2014/04/23/summer-2014-program-opportunities/
  [2]: http://hivenyc.org/2014/01/27/2014-winter-afterschool-programs-teens/#doe
  [3]: https://developers.google.com/maps/documentation/geocoding/
