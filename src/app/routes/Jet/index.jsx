import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../assets/css/product.css';
import Footer from '../../components/Footer';

export default function Jet() {
  const [groBurnt, setGroBurnt] = useState('0');
  const [groSupply, setGroSupply] = useState('0');
  const [groMarketCap, setGroMarketCap] = useState('0');
  const [groTotalSupply, setGroTotalSupply] = useState('0');
  const [groPrice, setGroPrice] = useState('0');

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/growth-defi')
      .then(async ({ data }) => {
        // console.log("data coins== ", data)
        const price = data.market_data.current_price.usd;
        setGroPrice(price.toFixed(2));
        const groData = await axios.get('https://api.growthdefi.com/token/gro');
        const groBurnt = groData.data.burnt * 1.0;

        setGroBurnt(groBurnt.toFixed(2));

        const groSupply = groData.data.totalSupply * 1.0;
        setGroSupply(groSupply.toFixed(2));

        const groMarketData = await axios.get(
          'https://api.coingecko.com/api/v3/coins/growth-defi?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'
        );
        const groCirculate_supply = groMarketData.data.market_data.circulating_supply * 1.0;

        setGroTotalSupply(groCirculate_supply.toFixed(2));

        const groMarketCap = (price * (groData.data.totalSupply * 1.0)).toFixed(2);
        setGroMarketCap(groMarketCap);
      })
      .catch((err) => {
        console.log({ err });
        console.error('Error during fetch coins growth-defi');
      });
  }, []);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <article id="post-51" className="post-51 page type-page status-publish hentry">
      <div className="entry-content">
        <div id="et-boc" className="et-boc">
          <div className="et-l et-l--post">
            <div className="et_builder_inner_content et_pb_gutters3">
              <div className="et_pb_section et_pb_section_0 et_pb_section_parallax et_pb_with_background et_pb_fullwidth_section et_section_regular gro">
                <div className="et_parallax_bg_wrap">
                  <div
                    className="et_parallax_bg"
                    style={{
                      backgroundImage: 'url("./assets/image/bg/crypto_illustration_11.png")',
                    }}
                  />
                </div>
                <section className="et_pb_module et_pb_fullwidth_header et_pb_fullwidth_header_0 JET et_animated et_hover_enabled et_pb_text_align_center et_pb_bg_layout_dark">
                  <div className="et_pb_fullwidth_header_container center">
                    <div className="header-content-container center">
                      <div className="header-content">
                        <img
                          loading="lazy"
                          width={256}
                          height={256}
                          src="./assets/image/gojet-logo.png"
                          title=""
                          alt=""
                          sizes="(max-width: 256px) 100vw, 256px"
                          className="header-logo wp-image-27"
                        />
                        <h1 className="et_pb_module_header">JET Token</h1>
                        <div className="et_pb_header_content_wrapper">
                          <p
                            className="blockParagraph-544a408c"
                            data-key="fcf003555ca04ed1bd021212cf4c10ba"
                          >
                            <span className="text-4505230f--TextH400-3033861f--textContentFamily-49a318e1">
                              <span data-key="667f836fd7104675a2ba6164810fcb4b">
                                JET is the core token of the ecosystem, it has governance rights
                                over everything, it is deflationary through multiple mechanisms and
                                it gets a share of the revenue from anything that is built within
                                the ecosystem.
                              </span>
                            </span>
                          </p>
                          <p
                            className="blockParagraph-544a408c"
                            data-key="a5a91432762842cfb2474b4d2bf0fd3d"
                            data-slate-fragment="JTdCJTIyb2JqZWN0JTIyJTNBJTIyZG9jdW1lbnQlMjIlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTJDJTIybm9kZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJwYXJhZ3JhcGglMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMnRleHQlMjIlMkMlMjJsZWF2ZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJsZWFmJTIyJTJDJTIydGV4dCUyMiUzQSUyMkdSTyUyMGlzJTIwdGhlJTIwY29yZSUyMHRva2VuJTIwb2YlMjB0aGUlMjBlY29zeXN0ZW0lMkMlMjBpdCUyMGhhcyUyMGdvdmVybmFuY2UlMjByaWdodHMlMjBvdmVyJTIwZXZlcnl0aGluZyUyQyUyMGl0JTIwaXMlMjBkZWZsYXRpb25hcnklMjB0aHJvdWdoJTIwbXVsdGlwbGUlMjBtZWNoYW5pc21zJTIwYW5kJTIwaXQlMjBnZXRzJTIwYSUyMHNoYXJlJTIwb2YlMjB0aGUlMjByZXZlbnVlJTIwZnJvbSUyMGFueXRoaW5nJTIwdGhhdCUyMGlzJTIwYnVpbHQuJTIyJTJDJTIybWFya3MlMjIlM0ElNUIlNUQlN0QlNUQlN0QlNUQlN0QlMkMlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJwYXJhZ3JhcGglMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMnRleHQlMjIlMkMlMjJsZWF2ZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJsZWFmJTIyJTJDJTIydGV4dCUyMiUzQSUyMkdSTyUyMGNhbiUyMGJlJTIwc3Rha2VkJTIwZm9yJTIwbW9yZSUyMEdSTyUyMChzdGtHUk8pJTIwb3IlMjBmb3IlMjBCTkIlMjAoR1JPJTIwWWllbGQpLiU1Q24lMjIlMkMlMjJtYXJrcyUyMiUzQSU1QiU1RCU3RCU1RCU3RCU1RCU3RCU1RCU3RA=="
                          >
                            <span className="text-4505230f--TextH400-3033861f--textContentFamily-49a318e1">
                              <span>
                                JET can be staked for more JET <a href="/staking">(stkGRO)</a> or{' '}
                                <span>
                                  for BNB{' '}
                                  <a
                                    target="_blank"
                                    href="https://grootdefi.com/yield"
                                    rel="noreferrer noopener"
                                  >
                                    (JET Yield)
                                  </a>
                                  .
                                </span>
                              </span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="et_pb_fullwidth_header_overlay" />
                  <div className="et_pb_fullwidth_header_scroll" />
                </section>
              </div>
              <div className="et_pb_section et_pb_section_1 JET et_pb_with_background et_section_regular gro">
                <div className="et_pb_row et_pb_row_0 gro">
                  <div className="et_pb_column et_pb_column_1_2 et_pb_column_0  et_pb_css_mix_blend_mode_passthrough">
                    <div className="et_pb_module et_pb_image et_pb_image_0 et_animated et-waypoint">
                      <span className="et_pb_image_wrap ">
                        <img
                          loading="lazy"
                          src="./assets/image/bg/Crypto_Illustration_03-1.png"
                          alt=""
                          title=""
                          height="auto"
                          width="auto"
                          sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) 800px, 100vw"
                          className="wp-image-56"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="et_pb_column et_pb_column_1_2 et_pb_column_1 JET et_pb_css_mix_blend_mode_passthrough et-last-child">
                    <div className="et_pb_module et_pb_text et_pb_text_0  et_pb_text_align_left et_pb_bg_layout_dark">
                      <div className="et_pb_text_inner">
                        <h2>Tokenomics</h2>
                      </div>
                    </div>
                    <div className="et_pb_module et_pb_divider et_pb_divider_0 et_pb_divider_position_ et_pb_space">
                      <div className="et_pb_divider_internal" />
                    </div>
                    <div className="et_pb_module et_pb_text et_pb_text_1  et_pb_text_align_left et_pb_bg_layout_dark">
                      <div className="et_pb_text_inner">
                        <p
                          className="blockParagraph-544a408c"
                          data-key="7d9fe753bd0f4fecbe32ddec3ad4bdfc"
                        >
                          <span className="text-4505230f--TextH400-3033861f--textContentFamily-49a318e1">
                            <span data-key="b8cfb5ea166742c68168a2f168870e14">
                              Price is ${numberWithCommas(groPrice)}
                            </span>
                          </span>
                        </p>
                        <p
                          className="blockParagraph-544a408c"
                          data-key="7d9fe753bd0f4fecbe32ddec3ad4bdfc"
                        >
                          <span className="text-4505230f--TextH400-3033861f--textContentFamily-49a318e1">
                            <span data-key="b8cfb5ea166742c68168a2f168870e14">
                              Total burnt of {numberWithCommas(groBurnt)} JET
                            </span>
                          </span>
                        </p>
                        <p
                          className="blockParagraph-544a408c"
                          data-key="7d9fe753bd0f4fecbe32ddec3ad4bdfc"
                        >
                          <span className="text-4505230f--TextH400-3033861f--textContentFamily-49a318e1">
                            <span data-key="b8cfb5ea166742c68168a2f168870e14">
                              Circulating supply of {numberWithCommas(groTotalSupply)} JET
                            </span>
                          </span>
                        </p>
                        <p
                          className="blockParagraph-544a408c"
                          data-key="d0c2d91adb7a4f5c8e5f6f6f95ad909d"
                          data-slate-fragment="JTdCJTIyb2JqZWN0JTIyJTNBJTIyZG9jdW1lbnQlMjIlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTJDJTIybm9kZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJwYXJhZ3JhcGglMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMnRleHQlMjIlMkMlMjJsZWF2ZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJsZWFmJTIyJTJDJTIydGV4dCUyMiUzQSUyMlN1cHBseSUyMERpc3RyaWJ1dGlvbiUyMGFzJTIwb2YlMjAwNiUyRjA0JTJGMjAyMSUzQSU1Q24lMjIlMkMlMjJtYXJrcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMm1hcmslMjIlMkMlMjJ0eXBlJTIyJTNBJTIyYm9sZCUyMiUyQyUyMmRhdGElMjIlM0ElN0IlN0QlN0QlNUQlN0QlNUQlN0QlNUQlN0QlMkMlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJwYXJhZ3JhcGglMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMnRleHQlMjIlMkMlMjJsZWF2ZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJsZWFmJTIyJTJDJTIydGV4dCUyMiUzQSUyMkNpcmN1bGF0aW5nJTIwc3VwcGx5JTIwb2YlMjAzNDIlMkMyODYlMjBHUk8lNUNuJTIyJTJDJTIybWFya3MlMjIlM0ElNUIlNUQlN0QlNUQlN0QlNUQlN0QlMkMlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJwYXJhZ3JhcGglMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMnRleHQlMjIlMkMlMjJsZWF2ZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJsZWFmJTIyJTJDJTIydGV4dCUyMiUzQSUyMlRvdGFsJTIwc3VwcGx5JTIwb2YlMjA1ODAlMkM5NzclMjBHUk8lMjIlMkMlMjJtYXJrcyUyMiUzQSU1QiU1RCU3RCU1RCU3RCU1RCU3RCU1RCU3RA=="
                        >
                          <span className="text-4505230f--TextH400-3033861f--textContentFamily-49a318e1">
                            <span data-key="100ef60fbf55496497d3415b8e363018">
                              Total supply of {numberWithCommas(groSupply)} JET
                            </span>
                          </span>
                        </p>
                        <p
                          className="blockParagraph-544a408c"
                          data-key="d0c2d91adb7a4f5c8e5f6f6f95ad909d"
                          data-slate-fragment="JTdCJTIyb2JqZWN0JTIyJTNBJTIyZG9jdW1lbnQlMjIlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTJDJTIybm9kZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJwYXJhZ3JhcGglMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMnRleHQlMjIlMkMlMjJsZWF2ZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJsZWFmJTIyJTJDJTIydGV4dCUyMiUzQSUyMlN1cHBseSUyMERpc3RyaWJ1dGlvbiUyMGFzJTIwb2YlMjAwNiUyRjA0JTJGMjAyMSUzQSU1Q24lMjIlMkMlMjJtYXJrcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMm1hcmslMjIlMkMlMjJ0eXBlJTIyJTNBJTIyYm9sZCUyMiUyQyUyMmRhdGElMjIlM0ElN0IlN0QlN0QlNUQlN0QlNUQlN0QlNUQlN0QlMkMlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJwYXJhZ3JhcGglMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMnRleHQlMjIlMkMlMjJsZWF2ZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJsZWFmJTIyJTJDJTIydGV4dCUyMiUzQSUyMkNpcmN1bGF0aW5nJTIwc3VwcGx5JTIwb2YlMjAzNDIlMkMyODYlMjBHUk8lNUNuJTIyJTJDJTIybWFya3MlMjIlM0ElNUIlNUQlN0QlNUQlN0QlNUQlN0QlMkMlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJwYXJhZ3JhcGglMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMnRleHQlMjIlMkMlMjJsZWF2ZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJsZWFmJTIyJTJDJTIydGV4dCUyMiUzQSUyMlRvdGFsJTIwc3VwcGx5JTIwb2YlMjA1ODAlMkM5NzclMjBHUk8lMjIlMkMlMjJtYXJrcyUyMiUzQSU1QiU1RCU3RCU1RCU3RCU1RCU3RCU1RCU3RA=="
                        >
                          <span className="text-4505230f--TextH400-3033861f--textContentFamily-49a318e1">
                            <span data-key="100ef60fbf55496497d3415b8e363018">
                              Marketcap: ${numberWithCommas(groMarketCap)}
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="et_pb_row et_pb_row_1">
                  <div className="et_pb_column et_pb_column_1_2 et_pb_column_2 JET et_pb_css_mix_blend_mode_passthrough">
                    <div className="et_pb_module et_pb_text et_pb_text_2  et_pb_text_align_right et_pb_bg_layout_dark">
                      <div className="et_pb_text_inner">
                        <h2>Deflationary&nbsp;</h2>
                      </div>
                    </div>
                    <div className="et_pb_module et_pb_divider et_pb_divider_1 et_pb_divider_position_ et_pb_space">
                      <div className="et_pb_divider_internal" />
                    </div>
                    <div className="et_pb_module et_pb_text et_pb_text_3  et_pb_text_align_right et_pb_bg_layout_dark">
                      <div className="et_pb_text_inner">
                        <p
                          className="blockParagraph-544a408c"
                          data-key="2745111dde9f4987ae2fc1320f19c8bb"
                        >
                          <span className="text-4505230f--TextH400-3033861f--textContentFamily-49a318e1">
                            <span data-key="1c3bce2113d54d6ab3c62502c3435ce4">
                              JET Bridge (1.5% of every swap is burnt)
                            </span>
                          </span>
                        </p>
                        <p
                          className="blockParagraph-544a408c"
                          data-key="3e12f9828ac242509314c9942e042568"
                        >
                          <span className="text-4505230f--TextH400-3033861f--textContentFamily-49a318e1">
                            <span data-key="6ccb855c07dc4561a5bb2ae7be8c4312">
                              stkJET (5% of every stake/unstake is burnt)
                            </span>
                          </span>
                        </p>
                        <p
                          className="blockParagraph-544a408c"
                          data-key="c356d40cc0374d1f92fe04f359a9ee43"
                        >
                          <span className="text-4505230f--TextH400-3033861f--textContentFamily-49a318e1">
                            <span data-key="b520691ca52947a59c759bc036a53670">
                              JET Yield (3% of every deposit/withdrawal is burnt)
                            </span>
                          </span>
                        </p>
                        <p
                          className="blockParagraph-544a408c"
                          data-key="954c5ac7e79149e09e557af93616a1c0"
                          data-slate-fragment="JTdCJTIyb2JqZWN0JTIyJTNBJTIyZG9jdW1lbnQlMjIlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTJDJTIybm9kZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJibG9jayUyMiUyQyUyMnR5cGUlMjIlM0ElMjJwYXJhZ3JhcGglMjIlMkMlMjJpc1ZvaWQlMjIlM0FmYWxzZSUyQyUyMmRhdGElMjIlM0ElN0IlN0QlMkMlMjJub2RlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMnRleHQlMjIlMkMlMjJsZWF2ZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJsZWFmJTIyJTJDJTIydGV4dCUyMiUzQSUyMi1HUk8lMjBCcmlkZ2UlMjAoMS41JTI1JTIwb2YlMjBldmVyeSUyMHN3YXAlMjBpcyUyMGJ1cm50KSUyMiUyQyUyMm1hcmtzJTIyJTNBJTVCJTVEJTdEJTVEJTdEJTVEJTdEJTJDJTdCJTIyb2JqZWN0JTIyJTNBJTIyYmxvY2slMjIlMkMlMjJ0eXBlJTIyJTNBJTIycGFyYWdyYXBoJTIyJTJDJTIyaXNWb2lkJTIyJTNBZmFsc2UlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTJDJTIybm9kZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJ0ZXh0JTIyJTJDJTIybGVhdmVzJTIyJTNBJTVCJTdCJTIyb2JqZWN0JTIyJTNBJTIybGVhZiUyMiUyQyUyMnRleHQlMjIlM0ElMjItc3RrR1JPJTIwKDUlMjUlMjBvZiUyMGV2ZXJ5JTIwc3Rha2UlMkZ1bnN0YWtlJTIwaXMlMjBidXJudCklMjIlMkMlMjJtYXJrcyUyMiUzQSU1QiU1RCU3RCU1RCU3RCU1RCU3RCUyQyU3QiUyMm9iamVjdCUyMiUzQSUyMmJsb2NrJTIyJTJDJTIydHlwZSUyMiUzQSUyMnBhcmFncmFwaCUyMiUyQyUyMmlzVm9pZCUyMiUzQWZhbHNlJTJDJTIyZGF0YSUyMiUzQSU3QiU3RCUyQyUyMm5vZGVzJTIyJTNBJTVCJTdCJTIyb2JqZWN0JTIyJTNBJTIydGV4dCUyMiUyQyUyMmxlYXZlcyUyMiUzQSU1QiU3QiUyMm9iamVjdCUyMiUzQSUyMmxlYWYlMjIlMkMlMjJ0ZXh0JTIyJTNBJTIyLUdSTyUyMFlpZWxkJTIwKDMlMjUlMjBvZiUyMGV2ZXJ5JTIwZGVwb3NpdCUyRndpdGhkcmF3YWwlMjBpcyUyMGJ1cm50KSUyMiUyQyUyMm1hcmtzJTIyJTNBJTVCJTVEJTdEJTVEJTdEJTVEJTdEJTJDJTdCJTIyb2JqZWN0JTIyJTNBJTIyYmxvY2slMjIlMkMlMjJ0eXBlJTIyJTNBJTIycGFyYWdyYXBoJTIyJTJDJTIyaXNWb2lkJTIyJTNBZmFsc2UlMkMlMjJkYXRhJTIyJTNBJTdCJTdEJTJDJTIybm9kZXMlMjIlM0ElNUIlN0IlMjJvYmplY3QlMjIlM0ElMjJ0ZXh0JTIyJTJDJTIybGVhdmVzJTIyJTNBJTVCJTdCJTIyb2JqZWN0JTIyJTNBJTIybGVhZiUyMiUyQyUyMnRleHQlMjIlM0ElMjItV0hFQVQlMjBCdXliYWNrJTIwQ29udHJhY3QlMjAoMTUlMjUlMjBvZiUyMHRoZSUyMHJldmVudWUlMjB0aGlzJTIwY29udHJhY3QlMjBnZXRzJTIwaXMlMjB1c2VkJTIwdG8lMjBidXliYWNrJTIwYW5kJTIwYnVybiUyMEdSTyklMjIlMkMlMjJtYXJrcyUyMiUzQSU1QiU1RCU3RCU1RCU3RCU1RCU3RCU1RCU3RA=="
                        >
                          <span className="text-4505230f--TextH400-3033861f--textContentFamily-49a318e1">
                            <span data-key="739e8fb4eb32420ea80344815abd003d">
                              WHEAT Buyback Contract (15% of the revenue this contract gets is used
                              to buyback and burn JET)
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="et_pb_column et_pb_column_1_2 et_pb_column_3  et_pb_css_mix_blend_mode_passthrough et-last-child">
                    <div className="et_pb_module et_pb_image et_pb_image_1 et_animated et-waypoint">
                      <span className="et_pb_image_wrap ">
                        <img
                          loading="lazy"
                          src="./assets/image/bg/Crypto_Illustration_05-1.png"
                          alt=""
                          title=""
                          height="auto"
                          width="auto"
                          sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) 800px, 100vw"
                          className="wp-image-57"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="et_pb_section et_pb_section_3 JET et_pb_section_parallax et_pb_with_background et_section_regular section_has_divider et_pb_top_divider">
                {/* <div className="et_pb_top_inside_divider et-no-transition" /> */}
                <div className="et_parallax_bg_wrap">
                  <div
                    className="et_parallax_bg"
                    style={{
                      backgroundImage: 'url("./assets/image/bg/crypto-bg-02.png")',
                    }}
                  />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
