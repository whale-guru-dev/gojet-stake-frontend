import React from 'react';

export default function Footer() {
  return (
    <div className="et_pb_section et_pb_section_8 et_pb_section_parallax et_pb_with_background et_section_regular section_has_divider et_pb_top_divider">
      {/* <div className="et_pb_top_inside_divider et-no-transition" /> */}
      <div className="et_parallax_bg_wrap">
        <div
          className="et_parallax_bg"
          style={{
            backgroundImage: 'url("./assets/image/bg/crypto-bg-02.png")',
          }}
        />
      </div>
      <div className="et_pb_row et_pb_row_11">
        <div className="et_pb_column et_pb_column_4_4 et_pb_column_22  et_pb_css_mix_blend_mode_passthrough et-last-child">
          <div className="et_pb_module et_pb_text et_pb_text_11  et_pb_text_align_center et_pb_bg_layout_dark">
            <div className="et_pb_text_inner">
              <h2>Keep Up To Date</h2>
            </div>
          </div>{' '}
          {/* .et_pb_text */}
          <div className="et_pb_module et_pb_divider et_pb_divider_6 et_pb_divider_position_ et_pb_space">
            <div className="et_pb_divider_internal" />
          </div>
          <div className="et_pb_module et_pb_text et_pb_text_12  et_pb_text_align_center et_pb_bg_layout_dark">
            <div className="et_pb_text_inner">
              <p>
                We have a very friendly telegram community and you can also find us on twitter as
                well as detailed posts on our medium channel.
              </p>
            </div>
          </div>{' '}
          {/* .et_pb_text */}
        </div>{' '}
        {/* .et_pb_column */}
      </div>{' '}
      {/* .et_pb_row */}
      <div className="et_pb_row et_pb_row_12">
        <div className="et_pb_column et_pb_column_1_3 et_pb_column_23  et_pb_css_mix_blend_mode_passthrough">
          <div className="et_pb_module et_pb_image et_pb_image_5">
            <a href="https://t.me/" target="_blank" className="et_pb_image_wrap " rel="noreferrer">
              <img
                loading="lazy"
                src="./assets/image/1024px-Telegram_logo.svg_.png"
                alt=""
                title="Telegram"
                height="auto"
                width="auto"
                sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) 1024px, 100vw"
                className="wp-image-44"
              />
            </a>
          </div>
        </div>{' '}
        {/* .et_pb_column */}
        <div className="et_pb_column et_pb_column_1_3 et_pb_column_24  et_pb_css_mix_blend_mode_passthrough">
          <div className="et_pb_module et_pb_image et_pb_image_6">
            <a
              href="https://twitter.com/"
              target="_blank"
              className="et_pb_image_wrap "
              rel="noreferrer"
            >
              <img
                loading="lazy"
                src="./assets/image/twitter-logo.png"
                alt=""
                title="Twitter"
                height="auto"
                width="auto"
                sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) 518px, 100vw"
                className="wp-image-45"
              />
            </a>
          </div>
        </div>{' '}
        {/* .et_pb_column */}
        <div className="et_pb_column et_pb_column_1_3 et_pb_column_25  et_pb_css_mix_blend_mode_passthrough et-last-child">
          <div className="et_pb_module et_pb_image et_pb_image_7">
            <a
              href="https://medium.com/"
              target="_blank"
              className="et_pb_image_wrap "
              rel="noreferrer"
            >
              <img
                loading="lazy"
                src="./assets/image/1200px-Medium_logo_Monogram.svg_.png"
                alt=""
                title="Medium"
                height="auto"
                width="auto"
                sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) 1200px, 100vw"
                className="wp-image-46"
              />
            </a>
          </div>
        </div>{' '}
        {/* .et_pb_column */}
      </div>{' '}
      <div className="et_pb_row et_pb_row_12">
        <div className="et_pb_module et_pb_image et_pb_image_7">
          <a href="/" className="et_pb_image_wrap ">
            <img
              loading="lazy"
              src="./assets/image/logo.png"
              alt="Growth Defi"
              data-height-percentage={100}
            />
          </a>
        </div>
      </div>
      {/* .et_pb_row */}
    </div>
  );
}
