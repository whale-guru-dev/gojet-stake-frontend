import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Footer from "../../components/Footer";

const StyledImg = styled.img`
  height: 180px;
  width: auto;
`;

const FlexRow = styled.div`
  // display: flex;
`;

const MarginAutoDiv = styled.div`
  // margin-left: auto;
  // margin-right: auto !important;
`;

export default function Home() {
  const [groBurnt, setGroBurnt] = useState("0");
  const [groSupply, setGroSupply] = useState("0");
  const [groMarketCap, setGroMarketCap] = useState("0");
  const [groTVL, setGroTVL] = useState("0");
  const [groPrice, setGroPrice] = useState("0");

  const [wheatBurnt, setWheatBurnt] = useState("0");
  const [wheatSupply, setWheatSupply] = useState("0");
  const [wheatMarketCap, setWheatMarketCap] = useState("0");
  const [wheatTVL, setWheatTVL] = useState("0");
  const [wheatPrice, setWheatPrice] = useState("0");

  useEffect(() => {
    async function fetchData() {
      const groPriceData = await axios.get(
        "https://api.coingecko.com/api/v3/coins/growth-defi"
      );
      const groPrice = groPriceData.data.market_data.current_price.usd;
      setGroPrice(groPrice);

      const groData = await axios.get("https://api.growthdefi.com/token/gro");
      const groBurnt = groData.data.burnt * 1.0;

      setGroBurnt(parseInt(groBurnt));

      const groSupply = groData.data.totalSupply * 1.0;
      setGroSupply(parseInt(groSupply));

      const groMarketCap = groPrice * (groData.data.totalSupply * 1.0);
      setGroMarketCap(parseInt(groMarketCap));

      const groTVLData = await axios.get(
        "https://api.growthdefi.com/tvl/gro-yield"
      );
      const groTVL = groTVLData.data.TVL * 1.0;
      setGroTVL(parseInt(groTVL));

      const wheatPriceData = await axios.get(
        "https://api.coingecko.com/api/v3/coins/wheat-token"
      );
      const wheatPrice = wheatPriceData.data.market_data.current_price.usd;
      setWheatPrice(wheatPrice);

      const wheatData = await axios.get(
        "https://api.growthdefi.com/token/wheat"
      );
      const wheatBurnt = wheatData.data.burnt * 1.0;

      setWheatBurnt(parseInt(wheatBurnt));

      const wheatSupply = wheatData.data.totalSupply * 1.0;
      setWheatSupply(parseInt(wheatSupply));

      const wheatMarketCap = wheatPrice * (wheatData.data.totalSupply * 1.0);
      setWheatMarketCap(parseInt(wheatMarketCap));

      const wheatTVLData = await axios.get(
        "https://api.growthdefi.com/tvl/wheat-tvl"
      );
      const wheatTVL = wheatTVLData.data.TVL * 1.0;
      setWheatTVL(parseInt(wheatTVL));
    }

    fetchData();
  }, []);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <article
      id="post-6"
      className="post-6 page type-page status-publish hentry"
    >
      <div className="entry-content">
        <div id="et-boc" className="et-boc">
          <div className="et-l et-l--post">
            <div className="et_builder_inner_content et_pb_gutters3">
              <div className="et_pb_section et_pb_section_0 et_pb_section_parallax et_pb_with_background et_pb_fullwidth_section et_section_regular">
                <div className="et_parallax_bg_wrap">
                  <div
                    className="et_parallax_bg"
                    style={{
                      backgroundImage:
                        'url("/assets/image/bg/crypto-bg-02.png")',
                    }}
                  />
                </div>
                <section className="et_pb_module et_pb_fullwidth_header et_pb_fullwidth_header_0 et_had_animation et_hover_enabled et_pb_text_align_center et_pb_bg_layout_dark">
                  <div className="et_pb_fullwidth_header_container center">
                    <div className="header-content-container center">
                      <div className="header-content">
                        <img
                          loading="lazy"
                          width={1134}
                          height={340}
                          src="./assets/image/logo.png"
                          title=""
                          alt=""
                          sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) 1134px, 100vw"
                          className="header-logo wp-image-26"
                        />
                        <div className="et_pb_header_content_wrapper_home">
                          <p>
                            GoJet is the first raffle token to involve private
                            jet flights in the crypto space. GoJet gives
                            investors the chance to stake tokens on the GoJet
                            platform and use their ($JET) tokens to then
                            purchase (elite) tokens which they can put towards
                            each raffle.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="et_pb_fullwidth_header_overlay" />
                  <div className="et_pb_fullwidth_header_scroll" />
                </section>
              </div>{" "}
              {/* .et_pb_section */}
              <div className="et_pb_section et_pb_section_1 et_pb_with_background et_section_regular">
                <div className="et_pb_row et_pb_row_0">
                  <div className="et_pb_column et_pb_column_4_4 et_pb_column_0  et_pb_css_mix_blend_mode_passthrough et-last-child">
                    <div className="et_pb_module et_pb_text et_pb_text_0  et_pb_text_align_center et_pb_bg_layout_dark">
                      <div className="et_pb_text_inner">
                        <h2>A MULTI ASSET ECOSYSTEM</h2>
                      </div>
                    </div>{" "}
                    {/* .et_pb_text */}
                    <div className="et_pb_module et_pb_divider et_pb_divider_0 et_pb_divider_position_ et_pb_space">
                      <div className="et_pb_divider_internal" />
                    </div>
                    <div className="et_pb_module et_pb_text et_pb_text_1  et_pb_text_align_center et_pb_bg_layout_dark">
                      <div className="et_pb_text_inner">
                        <p>
                          <span>
                            The Go Jet ecosystem utilises multiple assets in
                            order to create a sustainable environment. This
                            allows users to spread their exposure as well as
                            create single or multiple revenue streams from their
                            investments.
                          </span>
                        </p>
                      </div>
                    </div>{" "}
                    {/* .et_pb_text */}
                  </div>{" "}
                  {/* .et_pb_column */}
                </div>{" "}
                {/* .et_pb_row */}
              </div>{" "}
              {/* .et_pb_section */}
              <div className="et_pb_section et_pb_section_2 et_pb_with_background et_section_regular">
                <FlexRow className="et_pb_row et_pb_row_2 jet-token-section">
                  <div className="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_0 et_had_animation  et_pb_text_align_justified  et_pb_blurb_position_top et_pb_bg_layout_dark token_info_entry">
                    <div className="et_pb_blurb_content">
                      <div className="et_pb_main_blurb_image">
                        <StyledImg
                          loading="lazy"
                          src="./assets/image/gojet-logo.png"
                          alt="JET Logo"
                          className="et-waypoint et_pb_animation_top wp-image-27 et-animated"
                        />
                      </div>
                      <div className="et_pb_blurb_container">
                        <h1 className="et_pb_module_header">
                          <span>JET</span>
                        </h1>
                        <div className="et_pb_blurb_description" style={{textAlign: 'center'}}>
                          <p
                            className="blockParagraph-544a408c"
                            data-key="fcf003555ca04ed1bd021212cf4c10ba"
                          >
                            <span className="text-4505230f--TextH400-3033861f--textContentFamily-49a318e1">
                              <span data-key="667f836fd7104675a2ba6164810fcb4b">
                              🛩- 4 seater Jet ($150 per elite token)
                              </span>
                            </span>
                          </p>
                          <p
                            className="blockParagraph-544a408c"
                            data-key="a5a91432762842cfb2474b4d2bf0fd3d"
                            data-slate-fragment="JTdCJTIyb2JqZWN0JTIyJTNBJTIyZG9jdW1lbnQlMjIlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTJDJTIybm9kZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJwYXJhZ3JhcGglMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMnRleHQlMjIlMkMlMjJsZWF2ZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJsZWFmJTIyJTJDJTIydGV4dCUyMiUzQSUyMkdSTyUyMGlzJTIwdGhlJTIwY29yZSUyMHRva2VuJTIwb2YlMjB0aGUlMjBlY29zeXN0ZW0lMkMlMjBpdCUyMGhhcyUyMGdvdmVybmFuY2UlMjByaWdodHMlMjBvdmVyJTIwZXZlcnl0aGluZyUyQyUyMGl0JTIwaXMlMjBkZWZsYXRpb25hcnklMjB0aHJvdWdoJTIwbXVsdGlwbGUlMjBtZWNoYW5pc21zJTIwYW5kJTIwaXQlMjBnZXRzJTIwYSUyMHNoYXJlJTIwb2YlMjB0aGUlMjByZXZlbnVlJTIwZnJvbSUyMGFueXRoaW5nJTIwdGhhdCUyMGlzJTIwYnVpbHQuJTIyJTJDJTIybWFya3MlMjIlM0ElNUIlNUQlN0QlNUQlN0QlNUQlN0QlMkMlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJwYXJhZ3JhcGglMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMnRleHQlMjIlMkMlMjJsZWF2ZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJsZWFmJTIyJTJDJTIydGV4dCUyMiUzQSUyMkdSTyUyMGNhbiUyMGJlJTIwc3Rha2VkJTIwZm9yJTIwbW9yZSUyMEdSTyUyMChzdGtHUk8pJTIwb3IlMjBmb3IlMjBCTkIlMjAoR1JPJTIwWWllbGQpLiUyMiUyQyUyMm1hcmtzJTIyJTNBJTVCJTVEJTdEJTVEJTdEJTVEJTdEJTVEJTdE"
                          >
                            <span className="text-4505230f--TextH400-3033861f--textContentFamily-49a318e1">
                              <span data-key="c1f50bcf0d7a418db585a2b9529f553f">
                              ✈️- 6 seater Jet ($250 per elite token)
                              </span>
                            </span>
                          </p>
                          <p
                            className="blockParagraph-544a408c"
                            data-key="a5a91432762842cfb2474b4d2bf0fd3d"
                            data-slate-fragment="JTdCJTIyb2JqZWN0JTIyJTNBJTIyZG9jdW1lbnQlMjIlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTJDJTIybm9kZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJwYXJhZ3JhcGglMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMnRleHQlMjIlMkMlMjJsZWF2ZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJsZWFmJTIyJTJDJTIydGV4dCUyMiUzQSUyMkdSTyUyMGlzJTIwdGhlJTIwY29yZSUyMHRva2VuJTIwb2YlMjB0aGUlMjBlY29zeXN0ZW0lMkMlMjBpdCUyMGhhcyUyMGdvdmVybmFuY2UlMjByaWdodHMlMjBvdmVyJTIwZXZlcnl0aGluZyUyQyUyMGl0JTIwaXMlMjBkZWZsYXRpb25hcnklMjB0aHJvdWdoJTIwbXVsdGlwbGUlMjBtZWNoYW5pc21zJTIwYW5kJTIwaXQlMjBnZXRzJTIwYSUyMHNoYXJlJTIwb2YlMjB0aGUlMjByZXZlbnVlJTIwZnJvbSUyMGFueXRoaW5nJTIwdGhhdCUyMGlzJTIwYnVpbHQuJTIyJTJDJTIybWFya3MlMjIlM0ElNUIlNUQlN0QlNUQlN0QlNUQlN0QlMkMlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJwYXJhZ3JhcGglMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMnRleHQlMjIlMkMlMjJsZWF2ZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJsZWFmJTIyJTJDJTIydGV4dCUyMiUzQSUyMkdSTyUyMGNhbiUyMGJlJTIwc3Rha2VkJTIwZm9yJTIwbW9yZSUyMEdSTyUyMChzdGtHUk8pJTIwb3IlMjBmb3IlMjBCTkIlMjAoR1JPJTIwWWllbGQpLiUyMiUyQyUyMm1hcmtzJTIyJTNBJTVCJTVEJTdEJTVEJTdEJTVEJTdEJTVEJTdE"
                          >
                            <span className="text-4505230f--TextH400-3033861f--textContentFamily-49a318e1">
                              <span data-key="c1f50bcf0d7a418db585a2b9529f553f">
                              🛫- 8 seater Jet ($350 per elite token)
                              </span>
                            </span>
                          </p>
                          <p
                            className="blockParagraph-544a408c"
                            data-key="a5a91432762842cfb2474b4d2bf0fd3d"
                            data-slate-fragment="JTdCJTIyb2JqZWN0JTIyJTNBJTIyZG9jdW1lbnQlMjIlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTJDJTIybm9kZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJwYXJhZ3JhcGglMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMnRleHQlMjIlMkMlMjJsZWF2ZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJsZWFmJTIyJTJDJTIydGV4dCUyMiUzQSUyMkdSTyUyMGlzJTIwdGhlJTIwY29yZSUyMHRva2VuJTIwb2YlMjB0aGUlMjBlY29zeXN0ZW0lMkMlMjBpdCUyMGhhcyUyMGdvdmVybmFuY2UlMjByaWdodHMlMjBvdmVyJTIwZXZlcnl0aGluZyUyQyUyMGl0JTIwaXMlMjBkZWZsYXRpb25hcnklMjB0aHJvdWdoJTIwbXVsdGlwbGUlMjBtZWNoYW5pc21zJTIwYW5kJTIwaXQlMjBnZXRzJTIwYSUyMHNoYXJlJTIwb2YlMjB0aGUlMjByZXZlbnVlJTIwZnJvbSUyMGFueXRoaW5nJTIwdGhhdCUyMGlzJTIwYnVpbHQuJTIyJTJDJTIybWFya3MlMjIlM0ElNUIlNUQlN0QlNUQlN0QlNUQlN0QlMkMlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJwYXJhZ3JhcGglMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMnRleHQlMjIlMkMlMjJsZWF2ZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJsZWFmJTIyJTJDJTIydGV4dCUyMiUzQSUyMkdSTyUyMGNhbiUyMGJlJTIwc3Rha2VkJTIwZm9yJTIwbW9yZSUyMEdSTyUyMChzdGtHUk8pJTIwb3IlMjBmb3IlMjBCTkIlMjAoR1JPJTIwWWllbGQpLiUyMiUyQyUyMm1hcmtzJTIyJTNBJTVCJTVEJTdEJTVEJTdEJTVEJTdEJTVEJTdE"
                          >
                            <span className="text-4505230f--TextH400-3033861f--textContentFamily-49a318e1">
                              <span data-key="c1f50bcf0d7a418db585a2b9529f553f">
                              🚅-12 seater Jet ($500 per elite token)
                              </span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>{" "}
                    {/* .et_pb_blurb_content */}
                  </div>{" "}
                  {/* .et_pb_blurb */}
                  <div className="et_pb_button_module_wrapper et_pb_button_0_wrapper et_pb_button_alignment_center et_pb_module ">
                    <a
                      className="et_pb_button et_pb_button_0 et_pb_bg_layout_light"
                      href="/jet"
                    >
                      ENTER JET
                    </a>
                  </div>
                </FlexRow>
                {/* .et_pb_row */}
              </div>{" "}
              {/* .et_pb_section */}
              <div className="et_pb_section et_pb_section_4 et_pb_with_background et_section_regular">
                <div className="et_pb_row et_pb_row_4">
                  <div className="et_pb_column et_pb_column_2_3 et_pb_column_7  et_pb_css_mix_blend_mode_passthrough">
                    <div className="et_pb_module et_pb_text et_pb_text_4  et_pb_text_align_left et_pb_bg_layout_dark">
                      <div className="et_pb_text_inner">
                        <h2>Why Invest in Go Jet?</h2>
                      </div>
                    </div>{" "}
                    {/* .et_pb_text */}
                    <div className="et_pb_module et_pb_divider et_pb_divider_2 et_pb_divider_position_ et_pb_space">
                      <div className="et_pb_divider_internal" />
                    </div>
                    <div className="et_pb_module et_pb_text et_pb_text_5  et_pb_text_align_left et_pb_bg_layout_dark">
                      <div className="et_pb_text_inner">
                        <p>
                          Go Jet is committed to creating a sustainable yield
                          farming experience that utilises multichain protocols
                          in order generate a variety of passive income streams
                          using single asset staking and incentivised liquidity
                          provision.&nbsp;
                        </p>
                      </div>
                    </div>{" "}
                    {/* .et_pb_text */}
                  </div>{" "}
                  {/* .et_pb_column */}
                  <div className="et_pb_column et_pb_column_1_3 et_pb_column_8  et_pb_css_mix_blend_mode_passthrough et-last-child">
                    <div className="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_3  et_pb_text_align_left  et_pb_blurb_position_left et_pb_bg_layout_dark et_had_animation">
                      <div className="et_pb_blurb_content">
                        <div className="et_pb_main_blurb_image">
                          <span className="et_pb_image_wrap">
                            <span className="et-waypoint et_pb_animation_top et-pb-icon">
                              <img src="assets/image/internation.png" />
                            </span>
                          </span>
                        </div>
                        <div className="et_pb_blurb_container">
                          <h4 className="et_pb_module_header">
                            <span>Blockchain agnostic</span>
                          </h4>
                          <div className="et_pb_blurb_description">
                            <p>
                              We are always adding new products and strategies
                              to our environment. So whether the best
                              opportunities are on Ethereum, BSC or any other
                              platform we can integrate them into our ecosystem.
                            </p>
                          </div>
                        </div>
                      </div>{" "}
                      {/* .et_pb_blurb_content */}
                    </div>{" "}
                    {/* .et_pb_blurb */}
                  </div>{" "}
                  {/* .et_pb_column */}
                </div>{" "}
                {/* .et_pb_row */}
                <div className="et_pb_row et_pb_row_5">
                  <div className="et_pb_column et_pb_column_1_3 et_pb_column_9  et_pb_css_mix_blend_mode_passthrough">
                    <div className="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_4  et_pb_text_align_left  et_pb_blurb_position_left et_pb_bg_layout_dark et_had_animation">
                      <div className="et_pb_blurb_content">
                        <div className="et_pb_main_blurb_image">
                          <span className="et_pb_image_wrap">
                            <span className="et-waypoint et_pb_animation_top et-pb-icon">
                              <img src="./assets/image/combine.png" />
                            </span>
                          </span>
                        </div>
                        <div className="et_pb_blurb_container">
                          <h4 className="et_pb_module_header">
                            <span>Multi ASSET</span>
                          </h4>
                          <div className="et_pb_blurb_description">
                            <p>
                              We understand that one token can’t do everything –
                              not if you want a sustainable ecosystem that can
                              thrive as technology develops&nbsp; and changes .
                              All assets benefit the entire ecosystem.
                            </p>
                          </div>
                        </div>
                      </div>{" "}
                      {/* .et_pb_blurb_content */}
                    </div>{" "}
                    {/* .et_pb_blurb */}
                  </div>{" "}
                  {/* .et_pb_column */}
                  <div className="et_pb_column et_pb_column_1_3 et_pb_column_10  et_pb_css_mix_blend_mode_passthrough">
                    <div className="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_5  et_pb_text_align_left  et_pb_blurb_position_left et_pb_bg_layout_dark et_had_animation">
                      <div className="et_pb_blurb_content">
                        <div className="et_pb_main_blurb_image">
                          <span className="et_pb_image_wrap">
                            <span className="et-waypoint et_pb_animation_top et-pb-icon">
                              <img src="assets/image/warning.png" />
                            </span>
                          </span>
                        </div>
                        <div className="et_pb_blurb_container">
                          <h4 className="et_pb_module_header">
                            <span>Secure CONTRACTS</span>
                          </h4>
                          <div className="et_pb_blurb_description">
                            <p>
                              Our V1 strategy contracts have been been audited
                              by{" "}
                              <a href="https://consensys.net/diligence/audits/2020/12/growth-defi-v1/">
                                consensys
                              </a>
                              . We also use tried and battle tested contracts
                              that have shown to be safe and secure which can
                              viewed at any time by anyone.&nbsp;&nbsp;
                            </p>
                          </div>
                        </div>
                      </div>{" "}
                      {/* .et_pb_blurb_content */}
                    </div>{" "}
                    {/* .et_pb_blurb */}
                  </div>{" "}
                  {/* .et_pb_column */}
                  <div className="et_pb_column et_pb_column_1_3 et_pb_column_11  et_pb_css_mix_blend_mode_passthrough et-last-child">
                    <div className="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_6  et_pb_text_align_left  et_pb_blurb_position_left et_pb_bg_layout_dark et_had_animation">
                      <div className="et_pb_blurb_content">
                        <div className="et_pb_main_blurb_image">
                          <span className="et_pb_image_wrap">
                            <span className="et-waypoint et_pb_animation_top et-pb-icon">
                              <img src="assets/image/target.png" />
                            </span>
                          </span>
                        </div>
                        <div className="et_pb_blurb_container">
                          <h4 className="et_pb_module_header">
                            <span>EXPERIENCE</span>
                          </h4>
                          <div className="et_pb_blurb_description">
                            <p>
                              We have developed several products during our time
                              in the space and have covered a number of
                              blockchains including IOST, Ethereum and the
                              Binance Smart Chain.&nbsp;
                            </p>
                          </div>
                        </div>
                      </div>{" "}
                      {/* .et_pb_blurb_content */}
                    </div>{" "}
                    {/* .et_pb_blurb */}
                  </div>{" "}
                  {/* .et_pb_column */}
                </div>{" "}
                {/* .et_pb_row */}
                <div className="et_pb_row et_pb_row_6">
                  <div className="et_pb_column et_pb_column_1_3 et_pb_column_12  et_pb_css_mix_blend_mode_passthrough">
                    <div className="et_pb_with_border et_pb_module et_pb_blurb et_pb_blurb_7  et_pb_text_align_left  et_pb_blurb_position_left et_pb_bg_layout_dark et_had_animation">
                      <div className="et_pb_blurb_content">
                        <div className="et_pb_main_blurb_image">
                          <span className="et_pb_image_wrap">
                            <span className="et-waypoint et_pb_animation_top et-pb-icon">
                              <img src="assets/image/card.png" />
                            </span>
                          </span>
                        </div>
                        <div className="et_pb_blurb_container">
                          <h4 className="et_pb_module_header">
                            <span>REWARDS EVERY BLOCK</span>
                          </h4>
                          <div className="et_pb_blurb_description">
                            <p>
                              Rewards are distributed every block and there is
                              no time lock when staking. This means you can
                              watch your rewards grow multiple times a day.
                            </p>
                          </div>
                        </div>
                      </div>{" "}
                      {/* .et_pb_blurb_content */}
                    </div>{" "}
                    {/* .et_pb_blurb */}
                  </div>{" "}
                  {/* .et_pb_column */}
                  <div className="et_pb_column et_pb_column_2_3 et_pb_column_13  et_pb_css_mix_blend_mode_passthrough et-last-child">
                    <div className="et_pb_module et_pb_image et_pb_image_2 et_had_animation">
                      <span className="et_pb_image_wrap ">
                        <img
                          loading="lazy"
                          src="./assets/image/bg/crypto_illustration_03.png"
                          alt=""
                          title=""
                          height="auto"
                          width="auto"
                          sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) 515px, 100vw"
                          className="wp-image-22"
                        />
                      </span>
                    </div>
                  </div>{" "}
                  {/* .et_pb_column */}
                </div>{" "}
                {/* .et_pb_row */}
              </div>{" "}
              {/* .et_pb_section */}
              <div className="et_pb_section et_pb_section_6 et_pb_with_background et_section_regular">
                <div className="et_pb_row et_pb_row_8">
                  <div className="et_pb_column et_pb_column_1_2 et_pb_column_15  et_pb_css_mix_blend_mode_passthrough">
                    <div className="et_pb_module et_pb_text et_pb_text_8  et_pb_text_align_left et_pb_bg_layout_dark">
                      <div className="et_pb_text_inner">
                        <h2>Interconnected</h2>
                      </div>
                    </div>{" "}
                    {/* .et_pb_text */}
                    <div className="et_pb_module et_pb_divider et_pb_divider_4 et_pb_divider_position_ et_pb_space">
                      <div className="et_pb_divider_internal" />
                    </div>
                    <div className="et_pb_module et_pb_text et_pb_text_9  et_pb_text_align_left et_pb_bg_layout_dark">
                      <div className="et_pb_text_inner">
                        <p>
                          All our products are part of one ecosystem and they
                          all contribute to it’s sustainability. Through deposit
                          and withdraw fee’s, performance fee’s, buybacks, token
                          burns, deflationary mechanics, incentives, treasuries
                          and auto compounding we ensure the longevity of the
                          ecosystem and it’s rewards.
                        </p>
                      </div>
                    </div>{" "}
                  </div>{" "}
                  {/* .et_pb_column */}
                  <div className="et_pb_column et_pb_column_1_2 et_pb_column_16  et_pb_css_mix_blend_mode_passthrough et-last-child">
                    <div className="et_pb_module et_pb_image et_pb_image_3 et_had_animation">
                      <span className="et_pb_image_wrap ">
                        <img
                          loading="lazy"
                          src="./assets/image/bg/crypto_illustration_04.png"
                          alt=""
                          title=""
                          height="auto"
                          width="auto"
                          sizes="(max-width: 449px) 100vw, 449px"
                          className="wp-image-23"
                        />
                      </span>
                    </div>
                  </div>{" "}
                  {/* .et_pb_column */}
                </div>{" "}
                {/* .et_pb_row */}
              </div>{" "}
              {/* .et_pb_section */}
              <div className="et_pb_section et_pb_section_7 et_pb_with_background et_section_regular">
                <div className="et_pb_with_border et_pb_row et_pb_row_9">
                  <div className="et_pb_column et_pb_column_4_4 et_pb_column_17  et_pb_css_mix_blend_mode_passthrough et-last-child">
                    <div className="et_pb_module et_pb_text et_pb_text_10  et_pb_text_align_left et_pb_bg_layout_dark">
                      <div className="et_pb_text_inner">
                        <h1 style={{fontSize: '20px'}}>JET statistics</h1>
                      </div>
                    </div>{" "}
                    {/* .et_pb_text */}
                    <div className="et_pb_module et_pb_image et_pb_image_4">
                      <span className="et_pb_image_wrap ">
                        <img
                          loading="lazy"
                          src="./assets/image/gojet-logo.png"
                          alt=""
                          title="wheat-logo"
                          height="auto"
                          width="100"
                          className="wp-image-29"
                        />
                      </span>
                    </div>
                    <div className="et_pb_module et_pb_divider et_pb_divider_5 et_pb_divider_position_ et_pb_space">
                      <div className="et_pb_divider_internal" />
                    </div>
                  </div>{" "}
                  {/* .et_pb_column */}
                </div>{" "}
                {/* .et_pb_row */}
                <div className="et_pb_with_border et_pb_row et_pb_row_10 et_pb_gutters2">
                  <div className="et_pb_column et_pb_column_1_5 et_pb_column_17  et_pb_css_mix_blend_mode_passthrough">
                    <div
                      className="et_pb_module et_pb_number_counter et_pb_number_counter_2  et_pb_text_align_center et_pb_bg_layout_dark et_pb_with_title active"
                      data-number-value={groPrice}
                      data-number-separator=","
                    >
                      <div className="percent">
                        <p>
                          <span className="">{numberWithCommas(groPrice)}</span>
                          <span className="percent-sign" />
                        </p>
                      </div>
                      <h3 className="title">$ JET Price</h3>
                    </div>
                    {/* .et_pb_number_counter */}
                  </div>{" "}
                  {/* .et_pb_column */}
                  <div className="et_pb_column et_pb_column_1_5 et_pb_column_18  et_pb_css_mix_blend_mode_passthrough">
                    <div
                      className="et_pb_module et_pb_number_counter et_pb_number_counter_0  et_pb_text_align_center et_pb_bg_layout_dark et_pb_with_title active"
                      data-number-value={groMarketCap}
                      data-number-separator=","
                    >
                      <div className="percent">
                        <p>
                          <span className="">
                            {numberWithCommas(groMarketCap)}
                          </span>
                          {/* <Counter start={0} end={groMarketCap} delay={10} /> */}
                          <span className="percent-sign" />
                        </p>
                      </div>
                      <h3 className="title">$ Marketcap</h3>
                    </div>
                    {/* .et_pb_number_counter */}
                  </div>{" "}
                  {/* .et_pb_column */}
                  <div className="et_pb_column et_pb_column_1_5 et_pb_column_19  et_pb_css_mix_blend_mode_passthrough">
                    <div
                      className="et_pb_module et_pb_number_counter et_pb_number_counter_1  et_pb_text_align_center et_pb_bg_layout_dark et_pb_with_title active"
                      data-number-value={groBurnt}
                      data-number-separator=","
                    >
                      <div className="percent">
                        <p>
                          <span className="">{numberWithCommas(groBurnt)}</span>
                          <span className="percent-sign" />
                        </p>
                      </div>
                      <h3 className="title">TOTAl JET burned</h3>
                    </div>
                    {/* .et_pb_number_counter */}
                  </div>{" "}
                  {/* .et_pb_column */}
                  <div className="et_pb_column et_pb_column_1_5 et_pb_column_20  et_pb_css_mix_blend_mode_passthrough">
                    <div
                      className="et_pb_module et_pb_number_counter et_pb_number_counter_2  et_pb_text_align_center et_pb_bg_layout_dark et_pb_with_title active"
                      data-number-value={groSupply}
                      data-number-separator=","
                    >
                      <div className="percent">
                        <p>
                          <span className="">
                            {numberWithCommas(groSupply)}
                          </span>
                          <span className="percent-sign" />
                        </p>
                      </div>
                      <h3 className="title">TOTAL supply</h3>
                    </div>
                    {/* .et_pb_number_counter */}
                  </div>{" "}
                  {/* .et_pb_column */}
                  <div className="et_pb_column et_pb_column_1_5 et_pb_column_21  et_pb_css_mix_blend_mode_passthrough et-last-child">
                    <div
                      className="et_pb_module et_pb_number_counter et_pb_number_counter_3  et_pb_text_align_center et_pb_bg_layout_dark et_pb_with_title active"
                      data-number-value={groTVL}
                      data-number-separator=","
                    >
                      <div className="percent">
                        <p>
                          <span className="">{numberWithCommas(groTVL)}</span>
                          <span className="percent-sign" />
                        </p>
                      </div>
                      <h3 className="title">$ JET Yield total value locked</h3>
                    </div>
                    {/* .et_pb_number_counter */}
                  </div>{" "}
                  {/* .et_pb_column */}
                </div>{" "}
                {/* .et_pb_row */}
              </div>{" "}
              {/* .et_pb_section */}
              <Footer />
              {/* .et_pb_section */}
            </div>
            {/* .et_builder_inner_content */}
          </div>
          {/* .et-l */}
        </div>
        {/* #et-boc */}
      </div>{" "}
      {/* .entry-content */}
    </article>
  );
}
