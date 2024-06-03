export const Footer = () => {
  return (
    <div className="bg-darkGreen text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="ml-3 md:ml-0">
            <h2 className="text-lg font-semibold mb-2">Kontakt oss</h2>
            <hr className="border-t border-gray-300 mb-4" />
            <div className="mb-4">
              <strong>Telefon:</strong>
              <p className="text-white">
                <a href="tel:62000880">62 00 08 80</a>
              </p>
            </div>
            <div className="mb-4">
              <strong>Åpningstider:</strong>
              <p>Mandag-fredag kl. 08.00-15.30</p>
            </div>
            <div className="mb-4">
              <strong>E-post:</strong>
              <p className="text-white">
                <a href="mailto:example@example.com">Send e-post</a>
              </p>
            </div>
            <p className="text-white">
              <a href="mailto:example@example.com">Send sikker digital post</a>
            </p>
          </div>

          <div className="hidden md:block ml-4 md:ml-0">
            <h2 className="text-lg font-semibold mb-2">Postadresse</h2>
            <hr className="border-t border-gray-300 mb-4" />
            <p>Innlandet fylkeskommune</p>
            <p>Postboks 4404 Bedriftssenteret</p>
            <p>2325 Hamar</p>
            <p className="text-white mb-4">
              <a href="#">Se fakturaadresse</a>
            </p>
            <div>
              <strong>Organisasjonsnummer:</strong>
              <p>920 717 152</p>
            </div>
          </div>

          <div className="hidden md:block md:ml-0">
            <h2 className="text-lg font-semibold mb-2">Her finner du oss</h2>
            <hr className="border-t border-gray-300 mb-4" />
            <div className="mb-4">
              <strong>Fylkeshuset på Hamar</strong>
              <p>Parkgata 64</p>
              <p>2317 Hamar</p>
            </div>
            <div>
              <strong>Fylkeshuset på Lillehammer</strong>
              <p>Kirkegata 76</p>
              <p>2609 Lillehammer</p>
            </div>
          </div>
        </div>

        <div className="mt-8 md:ml-0">
          <h2 className="text-lg font-semibold mb-2">Følg oss</h2>
          <hr className="border-t border-gray-300 mb-4" />
          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-white">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-youtube"></i> YouTube
            </a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-white">
              Personvern
            </a>
            <a href="#" className="text-white">
              Informasjonskapsler (cookies)
            </a>
            <a href="#" className="text-white">
              Tilgjengelighetserklæring
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
