import React from 'react';
import { Link } from 'react-router-dom';
const DitaryScreen = () => {
    return (
        <div>
            <div className='container mx-auto'>
                <div className='lg:w-2/3 sm:w-4/5 mx-auto'>
                    <h2 className='text-2xl font-semibold border-b mb-8 pb-2'>Dietary Details</h2>
                    <div className=''>
                        <h3 className='text-lg font-semibold mb-3 leading-tight'>Allergensl</h3>
                        <div className='grid grid-cols-12 gap-4 mt-6'>
                            {/* Column #1 */}
                            <div className='md:col-span-6 col-span-12 border border-borderClr p-4 rounded-lg'>
                                <div className='flex items-center justify-between gap-x-2'>
                                    <svg className="" height="36" width="36" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M11.293.76706a.3913.3913,0,0,0-.3908.391V3.44336A3.14508,3.14508,0,0,0,9.59374,3.65a2.97607,2.97607,0,0,0,.04912-.5261A3.02523,3.02523,0,0,0,8.21937.56154a.39343.39343,0,0,0-.41867,0A2.99784,2.99784,0,0,0,6.42634,3.65335a3.15179,3.15179,0,0,0-1.30961-.21V1.158a.39076.39076,0,1,0-.78152,0V7.39526A3.6367,3.6367,0,0,0,7.61872,10.9808V15.108a.39076.39076,0,1,0,.78152,0V10.9808A3.63676,3.63676,0,0,0,11.6838,7.39526V1.158A.3913.3913,0,0,0,11.293.76706Zm-.3952,3.45819h.0044V6.49943a3.11663,3.11663,0,0,0-2.502,1.0321V6.41678a2.22546,2.22546,0,0,1,.47338-1.289,2.34128,2.34128,0,0,1,2.02528-.90253Zm-2.88944-2.855A2.23834,2.23834,0,0,1,8.8591,3.12279,2.27428,2.27428,0,0,1,8.436,4.43413c-.06364.06925-.12616.14074-.18422.21669a3.01315,3.01315,0,0,0-.24339.36973A3.40062,3.40062,0,0,0,7.765,4.65082q-.05694-.07371-.11723-.14409C7.62541,4.481,7.602,4.45758,7.57964,4.433a2.26967,2.26967,0,0,1-.422-1.31022A2.23505,2.23505,0,0,1,8.00836,1.37024ZM5.119,4.22525a2.35433,2.35433,0,0,1,1.93706.7953q.04521.05193.08708.10723a2.227,2.227,0,0,1,.47338,1.28788v1.117a3.12018,3.12018,0,0,0-2.502-1.0321V4.22637h.00335ZM5.11561,7.39637V7.28244h.00447A2.34286,2.34286,0,0,1,7.14534,8.185a2.22148,2.22148,0,0,1,.47338,1.30352v.70591a2.85144,2.85144,0,0,1-2.502-2.798Zm3.28351,2.798V9.48849A2.22148,2.22148,0,0,1,8.8725,8.185a2.3385,2.3385,0,0,1,2.0253-.90253h.0044v.11393a2.85142,2.85142,0,0,1-2.502,2.798Z" className="sc-iBPRYJ brBpOV"></path><path d="M15.9386,2.887a.39018.39018,0,0,0-.5392-.11952L13.0693,4.25079a.391.391,0,0,0,.4209.659l2.3301-1.48335a.3907.3907,0,0,0,.1194-.53951ZM3.51125,10.2792.18419,12.3579a.39079.39079,0,1,0,.41309.6635l3.32706-2.0787a.39033.39033,0,1,0-.41309-.6624Z" className="sc-iBPRYJ sc-jrAGrp brBpOV csVxQP"></path></svg>
                                    <div className='flex items-center justify-center w-[40%] bg-grayBg rounded-lg p-2' id="group1">
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">Yes</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="group1" value="value1" />
                                        </label>
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">No</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="group1" value="value2" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>
                                        Contains gluten
                                    </h3>
                                    <p className='text-[12px] mb-1'>
                                        Has gluten, wheat or grain proteins
                                    </p>
                                </div>
                            </div>
                            {/* Column #2 */}
                            <div className='md:col-span-6 col-span-12 border border-borderClr p-4 rounded-lg'>
                                <div className='flex items-center justify-between gap-x-2'>
                                    <svg height="36" width="36" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.61855,10.6121a.3898.3898,0,0,0-.38656.3921v2.6473a.38659.38659,0,1,0,.77311,0V11.0042A.3898.3898,0,0,0,9.61855,10.6121Zm.56435-7.94316a.71823.71823,0,0,0,.1337-.419V1.21925A.715.715,0,0,0,9.60753.5H6.53167a.715.715,0,0,0-.70905.71925V2.25106a.72125.72125,0,0,0,.13364.419l-.91337,3.3408A10.946,10.946,0,0,0,4.59338,9.4637V15.109a.3898.3898,0,0,0,.38656.3921H11.1582a.38979.38979,0,0,0,.3865-.3921V9.4637a10.94549,10.94549,0,0,0-.4495-3.45283l-.9134-3.3408ZM6.59573,1.28423H9.54348V2.185H6.59573ZM5.78618,6.22709l.89017-3.25678h2.7854l.89015,3.25678.0044.01344c.031.09747.0586.19382.0851.29129a4.8162,4.8162,0,0,0-2.14925.48062,5.92688,5.92688,0,0,1-2.80638.52431,8.282,8.282,0,0,1,.296-1.29622ZM10.7716,14.7169H5.36649V9.4637c0-.41564.011-.79095.03645-1.14049a6.75278,6.75278,0,0,0,3.204-.59265,4.20494,4.20494,0,0,1,2.009-.41788,12.47329,12.47329,0,0,1,.1557,2.151Z" className="sc-iBPRYJ brBpOV"></path><path d="M15.9392,2.97929a.38284.38284,0,0,0-.5334-.11988L12.1996,4.92865a.39513.39513,0,0,0-.1182.54112.38365.38365,0,0,0,.5346.11987L15.8222,3.5204a.39512.39512,0,0,0,.1182-.54111ZM2.67493,11.0074.18221,12.5871a.39546.39546,0,0,0-.1237.54.3827.3827,0,0,0,.53234.1254l2.49272-1.5796a.3955.3955,0,0,0,.1237-.54.38264.38264,0,0,0-.53234-.1244Z" className="sc-iBPRYJ sc-jrAGrp brBpOV iNWkQp"></path>
                                    </svg>
                                    <div className='flex items-center justify-center w-[40%] bg-grayBg rounded-lg p-2' id="group2">
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">Yes</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="group2" value="value1" />
                                        </label>
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">No</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="group2" value="value2" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>
                                        Contains dairy
                                    </h3>
                                </div>
                            </div>
                            {/* Column #3 */}
                            <div className='md:col-span-6 col-span-12 border border-borderClr p-4 rounded-lg'>
                                <div className='flex items-center justify-between gap-x-2'>
                                    <svg className="sc-jSgupP ckDfJz" height="36" width="36" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.119,8.152a4.20269,4.20269,0,0,1-1.2591-3.23131,4.34852,4.34852,0,0,0-.3644-2.05206A4.07514,4.07514,0,0,0,5.53765.59181,4.1184,4.1184,0,0,0,3.05046,2.79709,4.34641,4.34641,0,0,0,2.92565,6.1646a4.19252,4.19252,0,0,0,.95424,1.48456A4.20247,4.20247,0,0,1,5.139,10.8805a4.34779,4.34779,0,0,0,.36446,2.052A4.10918,4.10918,0,0,0,9.243,15.4a3.9836,3.9836,0,0,0,1.21816-.1918,4.11841,4.11841,0,0,0,2.4872-2.2053,4.34614,4.34614,0,0,0,.1248-3.36751,4.19118,4.19118,0,0,0-.9542-1.48456Zm.1325,4.50814a3.34076,3.34076,0,0,1-2.0211,1.791,3.30752,3.30752,0,0,1-4.02346-1.8477,3.52679,3.52679,0,0,1-.296-1.6673A5.00727,5.00727,0,0,0,4.42106,7.08053a3.405,3.405,0,0,1-.77421-1.20535A3.48,3.48,0,0,1,3.74846,3.141,3.34138,3.34138,0,0,1,5.76958,1.35a3.21488,3.21488,0,0,1,.98848-.15549A3.33547,3.33547,0,0,1,9.793,3.19774a3.52136,3.52136,0,0,1,.296,1.66616,5.00741,5.00741,0,0,0,1.4899,3.85556,3.4044,3.4044,0,0,1,.7742,1.20535,3.47956,3.47956,0,0,1-.1016,2.73419Zm-1.3408-2.6127a.38007.38007,0,0,0-.5356-.11353.40392.40392,0,0,0-.1105.55043,1.42878,1.42878,0,0,1,.1259.2509,1.35984,1.35984,0,0,1-.69023,1.724.4007.4007,0,0,0-.19659.5244.38542.38542,0,0,0,.35342.2361.3908.3908,0,0,0,.1568-.0341,2.16188,2.16188,0,0,0,1.0978-2.7398,2.112,2.112,0,0,0-.1999-.3984ZM7.29038,2.42917,6.715,2.32929a.387.387,0,0,0-.44509.32575.39541.39541,0,0,0,.317.4574l.57542.09987a.4203.4203,0,0,0,.06516.00568.39017.39017,0,0,0,.381-.33142.39542.39542,0,0,0-.317-.4574ZM8.68087,3.7606a.38253.38253,0,0,0-.50473-.21678.40062.40062,0,0,0-.211.51869l.1999.5028a.38632.38632,0,0,0,.35784.24629.37714.37714,0,0,0,.14689-.02951.40062.40062,0,0,0,.211-.51869Z" className="sc-iBPRYJ brBpOV"></path><path d="M15.9393,2.97068a.38008.38008,0,0,0-.5335-.12145L12.1864,4.9535a.40328.40328,0,0,0-.1182.5482.38039.38039,0,0,0,.5345.12144l3.2195-2.10426a.40346.40346,0,0,0,.1182-.5482ZM3.40938,10.6329.18221,12.7043a.40381.40381,0,0,0-.1237.5471.3838.3838,0,0,0,.328.1872.37893.37893,0,0,0,.20432-.0601l3.22828-2.0714a.40369.40369,0,0,0,.12369-.547.37972.37972,0,0,0-.53234-.126Z" className="sc-iBPRYJ sc-jrAGrp brBpOV iNWkQp"></path>
                                    </svg>
                                    <div className='flex items-center justify-center w-[40%] bg-grayBg rounded-lg p-2' id="group3">
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">Yes</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="group3" value="value1" />
                                        </label>
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">No</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="group3" value="value2" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>
                                        Contains nuts
                                    </h3>
                                </div>
                            </div>
                            {/* Column #4 */}
                            <div className='md:col-span-6 col-span-12 border border-borderClr p-4 rounded-lg'>
                                <div className='flex items-center justify-between gap-x-2'>
                                    <svg className="sc-jSgupP ckDfJz" height="36" width="36" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.90934,4.51215A1.93169,1.93169,0,1,0,6.97786,6.41492,1.91934,1.91934,0,0,0,8.90934,4.51215Zm-3.08143,0A1.15008,1.15008,0,1,1,6.97786,5.645,1.14272,1.14272,0,0,1,5.82791,4.51215ZM10.2055,8.519A1.93167,1.93167,0,1,0,8.27407,10.4218,1.91931,1.91931,0,0,0,10.2055,8.519ZM8.27407,9.65185A1.133,1.133,0,1,1,9.424,8.519,1.14272,1.14272,0,0,1,8.27407,9.65185Zm2.56113.3379a1.903,1.903,0,1,0,1.9315,1.90275A1.91931,1.91931,0,0,0,10.8352,9.98975Zm0,3.03565a1.133,1.133,0,1,1,1.15-1.1329A1.14278,1.14278,0,0,1,10.8352,13.0254ZM11.935,8.45075a3.62107,3.62107,0,0,0-1.4749-2.82226,3.52075,3.52075,0,0,0,.1787-1.211A3.59783,3.59783,0,0,0,8.91272,1.46a.68227.68227,0,0,0-.09155-.0594L7.31841.58669a.71125.71125,0,0,0-.67881,0l-1.21024.65552a3.69658,3.69658,0,0,0-1.02268.70392A3.55274,3.55274,0,0,0,3.317,4.51212,3.597,3.597,0,0,0,4.79186,7.40367,3.53234,3.53234,0,0,0,4.61211,8.52,3.62443,3.62443,0,0,0,7.17439,11.9604a3.56655,3.56655,0,0,0,.09155.7358,3.67165,3.67165,0,0,0,3.26226,2.7904c.1039.0088.2077.0121.3115.0121a3.692,3.692,0,0,0,.7436-.0759l1.246-.132a.69891.69891,0,0,0,.556-.3827l.5604-1.1186a3.5633,3.5633,0,0,0,.5516-1.8995,3.63726,3.63726,0,0,0-2.5612-3.44035Zm1.3375,4.94835a.33808.33808,0,0,0-.019.034l-.5504,1.0977-1.2225.1287a.25522.25522,0,0,0-.0402.0066,2.968,2.968,0,0,1-.8485.0528,2.88517,2.88517,0,0,1-2.56453-2.1942,2.79908,2.79908,0,0,1-.07258-.6721.61331.61331,0,0,0-.45216-.5994A2.85255,2.85255,0,0,1,5.39363,8.52a2.76479,2.76479,0,0,1,.16747-.95139.63348.63348,0,0,0-.24339-.74021A2.83223,2.83223,0,0,1,4.09854,4.51322,2.79758,2.79758,0,0,1,4.956,2.495a2.88207,2.88207,0,0,1,.815-.55983l.02344-.0121,1.18345-.64122,1.45922.7897a.35323.35323,0,0,0,.04131.0297A2.834,2.834,0,0,1,9.85724,4.43843a2.77454,2.77454,0,0,1-.23,1.18676.38228.38228,0,0,0,.15408.47954A2.85218,2.85218,0,0,1,11.1535,8.52114c0,.06489-.0023.132-.0067.198a.385.385,0,0,0,.3059.40256,2.86317,2.86317,0,0,1,2.2619,2.77163,2.80189,2.80189,0,0,1-.4432,1.508Z" className="sc-iBPRYJ brBpOV"></path><path d="M15.9375,3.02192a.39454.39454,0,0,0-.5404-.11329L12.2364,4.92909a.38169.38169,0,0,0-.115.53234.39483.39483,0,0,0,.5404.11438l3.1607-2.02045a.38169.38169,0,0,0,.115-.53234ZM3.51125,10.3044.18419,12.3513a.38164.38164,0,0,0-.125.5301.39411.39411,0,0,0,.53813.1232l3.32706-2.0468a.38176.38176,0,0,0,.125-.5302.39341.39341,0,0,0-.53813-.1221Z" className="sc-iBPRYJ sc-jrAGrp brBpOV iNWkQp"></path>
                                    </svg>
                                    <div className='flex items-center justify-center w-[40%] bg-grayBg rounded-lg p-2' id="group4">
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">Yes</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="group4" value="value1" />
                                        </label>
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">No</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="group4" value="value2" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>
                                        Contains soy/soybeans
                                    </h3>
                                </div>
                            </div>
                            {/* Column #5 */}
                            <div className='md:col-span-6 col-span-12 border border-borderClr p-4 rounded-lg'>
                                <div className='flex items-center justify-between gap-x-2'>
                                    <svg height="36" width="36" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.86749,12.425a.37441.37441,0,0,1,.00751.075,1.39564,1.39564,0,0,1-.0177.21777,1.52159,1.52159,0,0,1-.0553.23023,1.48763,1.48763,0,0,1-.09607.23,1.36383,1.36383,0,0,1-.14013.2168,1.24675,1.24675,0,0,1-.18744.19091,1.21068,1.21068,0,0,1-.23792.15216,1.30992,1.30992,0,0,1-.29175.10071A1.61127,1.61127,0,0,1,10.5,13.875a.373.373,0,0,1-.20966-.06409.37643.37643,0,0,1-.13586-.165.37554.37554,0,0,1,.19958-.49146.37073.37073,0,0,1,.07038-.02185A.37552.37552,0,0,1,10.5,13.125a.81392.81392,0,0,0,.19025-.02094.5813.5813,0,0,0,.14727-.05651.50175.50175,0,0,0,.10981-.08252.52489.52489,0,0,0,.07776-.09894.61968.61968,0,0,0,.0512-.1059.74371.74371,0,0,0,.03009-.10321.847.847,0,0,0,.01441-.09106c.00281-.02728.0039-.05091.00421-.06934a.36583.36583,0,0,1,.00909-.074.34971.34971,0,0,1,.02308-.06769.35834.35834,0,0,1,.0354-.06061.37528.37528,0,0,1,.04638-.05261.39986.39986,0,0,1,.05579-.04389.42492.42492,0,0,1,.06366-.03424.453.453,0,0,1,.07007-.02392.47848.47848,0,0,1,.07495-.01264.373.373,0,0,1,.20788.06446.37228.37228,0,0,1,.15619.23358ZM13.5,12a3.81578,3.81578,0,0,1-.06836.72461,3.54873,3.54873,0,0,1-.19726.666,3.39418,3.39418,0,0,1-.31446.59571,3.32012,3.32012,0,0,1-.93359.93359,3.39418,3.39418,0,0,1-.59571.31446,3.54873,3.54873,0,0,1-.666.19726,3.87458,3.87458,0,0,1-1.44922,0,3.54873,3.54873,0,0,1-.666-.19726,3.39418,3.39418,0,0,1-.59571-.31446,3.32012,3.32012,0,0,1-.93359-.93359,3.39418,3.39418,0,0,1-.31446-.59571,3.54873,3.54873,0,0,1-.19726-.666A3.81578,3.81578,0,0,1,6.5,12a6.91158,6.91158,0,0,1,.06836-.9541,7.05251,7.05251,0,0,1,.44922-1.70105A3.69259,3.69259,0,0,1,6,9.5,3.41768,3.41768,0,0,1,2.5,6C2.5,3.5,4,.5,6,.5S9.5,3.5,9.5,6a3.78494,3.78494,0,0,1-.0553.58643A2.02242,2.02242,0,0,1,10,6.5a2.058,2.058,0,0,1,.72461.13379,2.62792,2.62792,0,0,1,.666.374,3.77405,3.77405,0,0,1,.59571.57324A5.29654,5.29654,0,0,1,12.5,8.3125a6.79,6.79,0,0,1,.41992.84863,7.82642,7.82642,0,0,1,.51172,1.88477A6.91158,6.91158,0,0,1,13.5,12ZM6,8.75A2.65982,2.65982,0,0,0,8.75,6C8.75,3.86182,7.481,1.25,6,1.25S3.25,3.86182,3.25,6A2.65982,2.65982,0,0,0,6,8.75ZM12.75,12a6.08333,6.08333,0,0,0-.05743-.818,7.07668,7.07668,0,0,0-.164-.82624,7.19406,7.19406,0,0,0-.25817-.79834,6.35323,6.35323,0,0,0-.34-.73425,4.85825,4.85825,0,0,0-.40942-.634,3.26339,3.26339,0,0,0-.46644-.49762,2.03192,2.03192,0,0,0-.5111-.32514,1.3267,1.3267,0,0,0-1.0868,0,1.971,1.971,0,0,0-.3153.20057,3.32049,3.32049,0,0,1-1.093,1.3023,6.36222,6.36222,0,0,0-.31867.68817,7.19406,7.19406,0,0,0-.25817.79834,7.07668,7.07668,0,0,0-.164.82624A6.08333,6.08333,0,0,0,7.25,12a3.10415,3.10415,0,0,0,.0528.57568,2.81075,2.81075,0,0,0,.15283.52625A2.63645,2.63645,0,0,0,7.7,13.57037a2.54841,2.54841,0,0,0,.72968.72968,2.63645,2.63645,0,0,0,.46844.24432,2.81075,2.81075,0,0,0,.52625.15283,3.16473,3.16473,0,0,0,1.15136,0,2.81075,2.81075,0,0,0,.52625-.15283,2.63645,2.63645,0,0,0,.46844-.24432,2.54841,2.54841,0,0,0,.72968-.72968,2.63645,2.63645,0,0,0,.24432-.46844,2.81075,2.81075,0,0,0,.15283-.52625A3.10415,3.10415,0,0,0,12.75,12ZM7.50342,6.127a.3917.3917,0,0,0-.37842.36963A.59058.59058,0,0,1,6.5,7.125a.375.375,0,0,0,0,.75A1.33637,1.33637,0,0,0,7.875,6.5.37334.37334,0,0,0,7.50342,6.127Z" className="sc-iBPRYJ brBpOV"></path><path d="M15.93725,3.06713a.39454.39454,0,0,0-.5404-.11329L12.23615,4.9743a.38169.38169,0,0,0-.115.53234.39483.39483,0,0,0,.5404.11438l3.1607-2.02045a.38169.38169,0,0,0,.115-.53234ZM3.511,10.34961.18394,12.39651a.38164.38164,0,0,0-.125.5301.39411.39411,0,0,0,.53813.1232L3.92409,11.003a.38176.38176,0,0,0,.125-.5302.39341.39341,0,0,0-.53813-.1221Z" className="sc-iBPRYJ sc-jrAGrp brBpOV csVxQP"></path>
                                    </svg>
                                    <div className='flex items-center justify-center w-[40%] bg-grayBg rounded-lg p-2' id="group5">
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">Yes</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="group5" value="value1" />
                                        </label>
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">No</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="group5" value="value2" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>
                                        Contains eggs
                                    </h3>
                                </div>
                            </div>
                            {/* Column #6 */}
                            <div className='md:col-span-6 col-span-12 border border-borderClr p-4 rounded-lg'>
                                <div className='flex items-center justify-between gap-x-2'>
                                    <svg height="36" width="36" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10,4.62012H3.5A.37968.37968,0,0,0,3.12012,5a4.78225,4.78225,0,0,0,3.034,4.62012H5.5c-.16846,0-4.12012-.04688-4.12012-4.12012,0-4.05859,3.95264-4.11963,4.12012-4.12012h6a.37988.37988,0,0,0,0-.75976h-6C5.45117.62012.62012.67578.62012,5.5S5.45117,10.37988,5.5,10.37988H10A2.05609,2.05609,0,0,1,12.12012,12.5a2.03618,2.03618,0,0,1-2.1192,2.12006l-.0019.00006H8.34863a2.24459,2.24459,0,0,0-2.34863-2H3.5A.37968.37968,0,0,0,3.12012,13c0,.02344.03271,2.37988,2.87988,2.37988h4c.05371,0,5.37988-.06152,5.37988-5.37988S10.05371,4.62012,10,4.62012Zm-4,10c-1.46924,0-1.9209-.75586-2.05908-1.24024H6a1.47875,1.47875,0,0,1,1.57422,1.24024Zm6.57245-.71588A3.06369,3.06369,0,0,0,12.87988,12.5a2.82106,2.82106,0,0,0-.56451-1.788L13.80371,8.728a.37979.37979,0,1,0-.60742-.45606L11.767,10.17816a3.0003,3.0003,0,0,0-.79584-.39032l.88922-2.66772a.37984.37984,0,1,0-.7207-.24024l-.91882,2.75653c-.07428-.00579-.15375-.01629-.22083-.01629H9.5c-.01556,0-.06006-.00074-.12012-.00263V6.5a.37988.37988,0,0,0-.75976,0V9.55261c-1.52527-.19891-4.507-.99341-4.727-4.17273H10c.18848,0,4.62012.05274,4.62012,4.62012A4.16129,4.16129,0,0,1,12.57245,13.90424ZM6.75,6.5A.75.75,0,1,1,6,5.75.75.75,0,0,1,6.75,6.5Z" className="sc-iBPRYJ brBpOV"></path><path d="M.38037,13.1084a.38013.38013,0,0,1-.20068-.70313l2.83154-1.75683a.38021.38021,0,0,1,.40039.64648L.58008,13.05176A.38149.38149,0,0,1,.38037,13.1084Zm13.30225-8.188,2.13769-1.32666a.3798.3798,0,1,0-.40039-.64551L13.28223,4.2749a.3798.3798,0,1,0,.40039.64551Z" className="sc-iBPRYJ sc-jrAGrp brBpOV csVxQP"></path>
                                    </svg>
                                    <div className='flex items-center justify-center w-[40%] bg-grayBg rounded-lg p-2' id="group6">
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">Yes</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="group6" value="value1" />
                                        </label>
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">No</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="group6" value="value2" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>
                                        Contains shellfish
                                    </h3>
                                </div>
                            </div>
                            <div className='col-span-12'>
                                <div className='flex gap-x-2 w-full bg-grayBg rounded-lg p-3'>
                                    <input className='mb-3 !w-[50px] mt-1' type="checkbox" />
                                    <p className='mb-0'>
                                        You have selected “NO” above, which means this dish DOES NOT CONTAIN one or more
                                        serious allergens. By checking this box, you are confirming that this information
                                        is accurate, and that you will take all necessary precautions to ensure these
                                        allergens are not present in this dish for the health and safety of your
                                        customers.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-7 mb-5 border-b'></div>
                    </div>
                    <div className=''>
                        <h3 className='text-lg font-semibold mb-3 leading-tight'>Dietary</h3>
                        <div className='grid grid-cols-12 gap-4 mt-6'>
                            {/* Column #1 */}
                            <div className='md:col-span-6 col-span-12 border border-borderClr p-4 rounded-lg'>
                                <div className='flex items-center justify-between gap-x-2'>
                                    <svg height="36" width="36" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.4342.73628a.40362.40362,0,0,0-.5414-.19647,3.72507,3.72507,0,0,1-2.5954.56117.437.437,0,0,0-.1023-.01411,3.8856,3.8856,0,0,0-2.4699.3A4.01232,4.01232,0,0,0,7.84545,6.69275a3.93669,3.93669,0,0,0,.26953.48706,16.45475,16.45475,0,0,0-2.2736,4.93179A17.88013,17.88013,0,0,0,4.833,8.668a2.36755,2.36755,0,0,0,.78768-2.12353A3.81837,3.81837,0,0,0,4.79,4.6351,3.70458,3.70458,0,0,0,.70632,3.45745.40858.40858,0,0,0,.47978,3.648,3.81808,3.81808,0,0,0,.87014,7.92922,3.74861,3.74861,0,0,0,2.571,9.108a2.37378,2.37378,0,0,0,.75515.12471A2.28364,2.28364,0,0,0,4.12544,9.088,20.19089,20.19089,0,0,1,5.41617,15.1186a.22063.22063,0,0,0,.00465.0271c.00232.0129.00348.0259.007.0388a.39742.39742,0,0,0,.01278.04.29167.29167,0,0,0,.01278.0341.23777.23777,0,0,0,.02091.0377l.01743.0294a.39045.39045,0,0,0,.02788.0341l.02207.0247a.387.387,0,0,0,.0337.0282.20216.20216,0,0,0,.02555.02c.01278.0083.02672.0153.0395.0224a.30414.30414,0,0,0,.02789.0141.39681.39681,0,0,0,.04995.0153.18747.18747,0,0,0,.0244.0071.43944.43944,0,0,0,.079.0082h.029a.16233.16233,0,0,0,.02556-.0047.41116.41116,0,0,0,.04066-.0071.33857.33857,0,0,0,.03717-.0117.34761.34761,0,0,0,.03718-.0153c.01162-.0059.02324-.0118.03485-.0188a.32234.32234,0,0,0,.03253-.0212.33088.33088,0,0,0,.03021-.0259c.00929-.0082.01859-.0176.02788-.0271a.20332.20332,0,0,0,.0244-.0305c.00813-.0106.0151-.0212.02207-.0318l.01859-.0341a.3534.3534,0,0,0,.01627-.0365c.00464-.0129.00813-.0259.01162-.0388.00348-.013.007-.0259.00929-.0388.00232-.0142.00349-.0283.00465-.0424,0-.0094.00232-.0176.00232-.0259A13.86572,13.86572,0,0,1,8.237,8.51392q.20389-.34764.41475-.66823A3.93211,3.93211,0,0,0,11.4028,8.97981a3.87876,3.87876,0,0,0,1.6776-.38353c2.2736-1.08706,3.7955-4.75647,2.3491-7.86ZM2.82773,8.32569a2.9284,2.9284,0,0,1-1.3314-.92353,2.98867,2.98867,0,0,1-.3799-3.21176,2.90051,2.90051,0,0,1,3.04735.96941A2.977,2.977,0,0,1,4.81437,6.6551,1.55651,1.55651,0,0,1,4.467,7.87275a8.95488,8.95488,0,0,0-.78072-1.28706A.40305.40305,0,0,0,3.117,6.50216a.41494.41494,0,0,0-.08248.57647,8.29774,8.29774,0,0,1,.75283,1.25529,1.534,1.534,0,0,1-.96079-.00823Zm9.90877-.47412a3.06117,3.06117,0,0,1-2.3874.11647,3.1102,3.1102,0,0,1-1.21524-.80353,5.9745,5.9745,0,0,1,3.07874-2.4447.41107.41107,0,0,0,.3148-.48706.40613.40613,0,0,0-.481-.31883A6.57011,6.57011,0,0,0,8.6401,6.46451c-.02091-.04-.04182-.08117-.06041-.12235A3.18363,3.18363,0,0,1,10.0714,2.13157a3.08843,3.08843,0,0,1,2.1958-.18.40816.40816,0,0,0,.1347.01412,2.883,2.883,0,0,0,.4659.03882,4.7971,4.7971,0,0,0,1.9867-.53764c.948,2.56-.3126,5.52235-2.1168,6.3847Z" className="sc-iBPRYJ brBpOV"></path>
                                    </svg>
                                    <div className='flex items-center justify-center w-[40%] bg-grayBg rounded-lg p-2' id="vegan">
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">Yes</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="vegan" value="value1" />
                                        </label>
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">No</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="vegan" value="value2" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>
                                        Vegan
                                    </h3>
                                    <p className='text-[12px] mb-1'>
                                        No animal products like eggs, butter, ghee, honey, or milk.
                                    </p>
                                </div>
                            </div>
                            {/* Column #2 */}
                            <div className='md:col-span-6 col-span-12 border border-borderClr p-4 rounded-lg'>
                                <div className='flex items-center justify-between gap-x-2'>
                                    <svg height="36" width="36" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.9744,9.03078a3.7657,3.7657,0,0,0-5.495-1.836A2.32,2.32,0,0,0,9.3693,9.17193a2.26505,2.26505,0,0,0,.03115.37008,4.138,4.138,0,0,0-.93549.928V7.09146A2.3266,2.3266,0,0,0,10.0534,6.01678,3.75893,3.75893,0,0,0,8.2158.52667a.38455.38455,0,0,0-.28143,0,3.759,3.759,0,0,0-1.8376,5.49011A2.32516,2.32516,0,0,0,7.68632,7.09146v3.304a4.13918,4.13918,0,0,0-1.06452-1.018c.00556-.06779.01-.13559.01-.20449A2.31992,2.31992,0,0,0,5.52169,7.19593a3.76569,3.76569,0,0,0-5.495,1.836.38347.38347,0,0,0,0,.28117,3.76566,3.76566,0,0,0,5.495,1.83593,2.35992,2.35992,0,0,0,.881-.9735,3.3105,3.3105,0,0,1,1.28365,2.6517V15.111a.38932.38932,0,0,0,.77864,0V12.8283a3.29292,3.29292,0,0,1,.99555-2.3305c.06674-.0656.13682-.1278.208-.1867a2.365,2.365,0,0,0,.80978.839,3.76568,3.76568,0,0,0,5.495-1.83592.38347.38347,0,0,0,0-.28117ZM5.11012,10.4878A2.98626,2.98626,0,0,1,.812,9.17082a2.98631,2.98631,0,0,1,4.29811-1.317,1.55308,1.55308,0,0,1,.7297,1.1158,4.09051,4.09051,0,0,0-1.43826-.27451H3.317a.389.389,0,1,0,0,.778h1.0812a3.3001,3.3001,0,0,1,1.3337.29451,1.57058,1.57058,0,0,1-.62069.71908Zm1.6485-4.88333A2.9808,2.9808,0,0,1,8.07675,1.31018,2.98077,2.98077,0,0,1,9.39488,5.60447a1.56767,1.56767,0,0,1-.92769.69237V3.89409a.38933.38933,0,0,0-.77865,0V6.29684a1.56553,1.56553,0,0,1-.92881-.69237ZM12.465,10.9357a2.97511,2.97511,0,0,1-1.574-.4479,1.57971,1.57971,0,0,1-.5651-.60349,3.3221,3.3221,0,0,1,1.4639-.33785H12.901a.389.389,0,1,0,0-.778H11.8265a4.08514,4.08514,0,0,0-1.6774.34453A1.54877,1.54877,0,0,1,10.8899,7.855a2.9863,2.9863,0,0,1,4.2981,1.317,2.96487,2.96487,0,0,1-2.7241,1.76487Z" className="sc-iBPRYJ brBpOV"></path>
                                    </svg>
                                    <div className='flex items-center justify-center w-[40%] bg-grayBg rounded-lg p-2' id="vegetarianID">
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">Yes</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="vegetarianID" value="value1" />
                                        </label>
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">No</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="vegetarianID" value="value2" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>
                                        Vegetarian
                                    </h3>
                                </div>
                            </div>
                            {/* Column #3 */}
                            <div className='md:col-span-6 col-span-12 border border-borderClr p-4 rounded-lg'>
                                <div className='flex items-center justify-between gap-x-2'>
                                    <svg height="36" width="36" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.7699,9.24329a5.28672,5.28672,0,0,0-2.2452-2.87418,2.14819,2.14819,0,0,1-.928-1.27477,3.52582,3.52582,0,0,0-.1902-.5363A3.79253,3.79253,0,0,0,6.29273,2.4687l-.05.01071A1.82236,1.82236,0,0,1,7.51849.81579.41365.41365,0,0,0,7.81243.29732.44229.44229,0,0,0,7.26709.01787,2.58877,2.58877,0,0,0,5.6123,1.44247a2.70107,2.70107,0,0,0-.743-.57793,2.85272,2.85272,0,0,0-2.64165,0A.41727.41727,0,0,0,2,1.25458,2.58231,2.58231,0,0,0,3.39592,3.38673a2.81119,2.81119,0,0,0,.74171.2628,3.46879,3.46879,0,0,0-.35647.46614,3.40334,3.40334,0,0,0-.38775,2.867c.01752.0547.03628.1094.055.16173A2.01309,2.01309,0,0,1,3.40467,8.682a4.99549,4.99549,0,0,0-.085,3.93729A5.54334,5.54334,0,0,0,8.48535,16a5.7397,5.7397,0,0,0,1.1995-.1272,5.46531,5.46531,0,0,0,3.56225-2.4734,5.04346,5.04346,0,0,0,.5241-4.15611ZM2.91311,1.48171a1.92856,1.92856,0,0,1,1.531.11059,1.76379,1.76379,0,0,1,.90682,1.17131l-.045.02141a1.96118,1.96118,0,0,1-1.48468-.126A1.75631,1.75631,0,0,1,2.91311,1.48171ZM12.4904,12.9796a4.60351,4.60351,0,0,1-2.99817,2.081,4.70752,4.70752,0,0,1-5.35335-2.7374A4.19724,4.19724,0,0,1,4.21018,9.009a2.80639,2.80639,0,0,0,.065-2.14284c-.015-.04043-.02877-.082-.04253-.12486a2.606,2.606,0,0,1,.29769-2.19517,2.77913,2.77913,0,0,1,1.1207-.9977h.00125a3.0405,3.0405,0,0,1,.80175-.26161,2.94521,2.94521,0,0,1,.51907-.04638,2.88074,2.88074,0,0,1,2.6279,1.64459,2.66987,2.66987,0,0,1,.14634.41264A2.97725,2.97725,0,0,0,11.0419,7.06476,4.439,4.439,0,0,1,12.9306,9.4823,4.24352,4.24352,0,0,1,12.4904,12.9796Zm-1.466-2.9253A2.67386,2.67386,0,0,0,7.72983,8.3657a2.50035,2.50035,0,0,0-1.77611,3.1322,2.5338,2.5338,0,0,0,1.27955,1.4936,2.73969,2.73969,0,0,0,1.252.3032,2.795,2.795,0,0,0,.763-.107,2.50039,2.50039,0,0,0,1.77612-3.1322ZM8.99687,12.3886a1.84718,1.84718,0,0,1-1.34834-.1308,1.6552,1.6552,0,0,1,.33271-3.09537,1.86728,1.86728,0,0,1,.50656-.07135,1.76547,1.76547,0,0,1,1.6973,1.201,1.67282,1.67282,0,0,1-1.18948,2.0953Z" className="sc-iBPRYJ brBpOV"></path>
                                    </svg>
                                    <div className='flex items-center justify-center w-[40%] bg-grayBg rounded-lg p-2' id="paleoID">
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">Yes</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="paleoID" value="value1" />
                                        </label>
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">No</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="paleoID" value="value2" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>
                                        Paleo
                                    </h3>
                                    <p className='text-[12px] mb-1'>
                                        Dish only includes lean meats, fish, fruits, vegetables, nuts and seeds. Excludes grains, legumes, dairy, sugar, and fruit juices.
                                    </p>
                                    <Link to="" className='font-semibold'>Learn More</Link>
                                </div>
                            </div>
                            {/* Column #4 */}
                            <div className='md:col-span-6 col-span-12 border border-borderClr p-4 rounded-lg'>
                                <div className='flex items-center justify-between gap-x-2'>
                                    <svg height="36" width="36" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.9722,8.47073A1.836,1.836,0,0,1,14.586,7.237a3.27394,3.27394,0,0,0-.0172-.49728A3.189,3.189,0,0,0,11.9026,3.875l-.0379-.00357c.0069-.01785.0149-.03688.023-.05473l.0103-.0226A1.42609,1.42609,0,0,1,13.1469,2.909a.41669.41669,0,0,0,0-.83278,1.99535,1.99535,0,0,0-1.0438.30218,2.63246,2.63246,0,0,0-.1627-.6341A2.52117,2.52117,0,0,0,10.0521.17272a.396.396,0,0,0-.39761.16893,2.67644,2.67644,0,0,0-.2876,2.49476A2.57648,2.57648,0,0,0,10.4543,4.1058a3.0624,3.0624,0,0,0-.82731.55439A3.34771,3.34771,0,0,0,8.57285,7.09784c0,.05,0,.09993.00344.1499A1.80975,1.80975,0,0,1,8.189,8.46954,4.69346,4.69346,0,0,0,7.17268,11.7459a4.51648,4.51648,0,0,0,4.09392,4.2412c.1066.0072.212.0119.3174.0119a4.28761,4.28761,0,0,0,3.01-1.2337,4.71427,4.71427,0,0,0,.377-6.29576ZM10.169,1.0626a1.71794,1.71794,0,0,1,1.0277.997,1.81541,1.81541,0,0,1-.0618,1.46211.165.165,0,0,0-.0333-.01427,1.744,1.744,0,0,1-.9922-.98625,1.81443,1.81443,0,0,1,.0607-1.45973Zm3.8796,13.096a3.5169,3.5169,0,0,1-2.7258,1.0005,3.69445,3.69445,0,0,1-3.3492-3.4703,3.83943,3.83943,0,0,1,.8307-2.68272,2.66235,2.66235,0,0,0,.5729-1.79641c-.00114-.03688-.00229-.07257-.00229-.10945a2.49642,2.49642,0,0,1,.78949-1.819,2.09518,2.09518,0,0,1,1.438-.58889,1.94321,1.94321,0,0,1,.2188.01189,2.38916,2.38916,0,0,1,1.9525,2.13072,2.47232,2.47232,0,0,1,.0126.36642,2.68731,2.68731,0,0,0,.5717,1.80474,3.8468,3.8468,0,0,1,.841,2.40672A3.77985,3.77985,0,0,1,14.0486,14.1586ZM11.5818,9.207A2.23106,2.23106,0,1,0,13.729,11.4365,2.19175,2.19175,0,0,0,11.5818,9.207Zm0,3.625a1.39769,1.39769,0,1,1,1.3452-1.3967A1.373,1.373,0,0,1,11.5818,12.832ZM8.11916,3.912A4.15431,4.15431,0,0,0,4.35291.011,3.94253,3.94253,0,0,0,1.29247,1.13527,4.30949,4.30949,0,0,0,0,4.2213,4.61853,4.61853,0,0,0,1.289,6.92663a1.64142,1.64142,0,0,1,.34374,1.10045,3.08929,3.08929,0,0,0,.016.45922c.01261.12016.02292.23794.03323.35452.06187.72214.13635,1.57518.96362,1.96778l.00344,1.4597a1.40912,1.40912,0,0,1-.35864.9279,1.53665,1.53665,0,0,0-.36895,1.1576,1.48088,1.48088,0,0,0,1.29934,1.3384,1.38467,1.38467,0,0,0,.7505-.1428,1.391,1.391,0,0,0,.629.1511c.0401,0,.08135-.0012.12146-.0047a1.48032,1.48032,0,0,0,1.30507-1.3325,1.53569,1.53569,0,0,0-.36437-1.1599,1.41368,1.41368,0,0,1-.354-.9315l-.00344-1.4598a1.67722,1.67722,0,0,0,.83529-.6353,3.46824,3.46824,0,0,0,.35864-1.982V8.15438c0-.0464,0-.0928-.00344-.138a1.61269,1.61269,0,0,1,.34489-1.08856A4.50869,4.50869,0,0,0,8.11916,3.91436ZM4.50759,12.2707A2.26085,2.26085,0,0,0,5.069,13.7601a.67947.67947,0,0,1,.16156.5164.65255.65255,0,0,1-.57519.5877.61254.61254,0,0,1-.4377-.1333.38728.38728,0,0,0-.48582,0,.6048.6048,0,0,1-.43884.1309.65389.65389,0,0,1-.5729-.5901.67741.67741,0,0,1,.1627-.5151,2.26121,2.26121,0,0,0,.56832-1.4895l-.00344-1.2587c.11229.0107.2326.0155.36093.0155a6.23921,6.23921,0,0,0,.6955-.0357ZM6.2263,6.39128a2.46138,2.46138,0,0,0-.53051,1.66317c.00114.03212.00229.06543.00229.09755v.04045A2.994,2.994,0,0,1,5.485,9.6962c-.22343.3319-.77112.4937-1.67516.4937-1.20424,0-1.2432-.4473-1.328-1.42522-.01031-.12253-.02177-.24745-.03552-.37355a2.25354,2.25354,0,0,1-.01146-.32836,2.48915,2.48915,0,0,0-.52936-1.67031A3.984,3.984,0,0,1,.80321,4.2213a3.41226,3.41226,0,0,1,1.037-2.47691A3.165,3.165,0,0,1,4.063.83428c.07791,0,.15583.00238.23489.00833a3.33322,3.33322,0,0,1,3.02148,3.13A3.79251,3.79251,0,0,1,6.2263,6.39246ZM4.24985,1.55384a.40506.40506,0,0,0-.42739.38664.41092.41092,0,0,0,.37239.44376,1.80844,1.80844,0,0,1,1.6385,1.69648.40789.40789,0,0,0,.39988.38664h.02865a.411.411,0,0,0,.37124-.44494A2.62975,2.62975,0,0,0,4.24985,1.55384Z" className="sc-iBPRYJ brBpOV"></path>
                                    </svg>
                                    <div className='flex items-center justify-center w-[40%] bg-grayBg rounded-lg p-2' id="ketoID">
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">Yes</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="ketoID" value="value1" />
                                        </label>
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">No</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="ketoID" value="value2" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>
                                        Keto
                                    </h3>
                                    <p className='text-[12px] mb-1'>
                                        No grains, starchy vegetables, honey, sugar, or baked goods (including gluten-free).
                                    </p>
                                </div>
                            </div>
                            {/* Column #5 */}
                            <div className='md:col-span-6 col-span-12 border border-borderClr p-4 rounded-lg'>
                                <div className='flex items-center justify-between gap-x-2'>
                                    <svg height="36" width="36" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.9994,0C3.58824,0,0,3.58824,0,7.9994c0,4.4112,3.58824,7.9994,7.9994,7.9994c4.4112,0,7.9994-3.5882,7.9994-7.9994C15.9988,3.58824,12.4106,0,7.9994,0z M7.9994,15.1664c-3.95147,0-7.16576-3.2143-7.16576-7.1658c0-3.95147,3.21429-7.16696,7.16576-7.16696c3.9515,0,7.1658,3.21429,7.1658,7.16576c0,3.9515-3.2143,7.1658-7.1658,7.1658V15.1664z M11.8842,4.51469c-0.4609-0.40967-1.0671-0.58712-1.7066-0.50018C9.17246,4.15146,8.4448,4.92437,8.3662,5.93665c-0.05121,0.66096-0.04168,1.32549-0.03334,1.9674C8.33643,8.19344,8.34119,8.49236,8.34,8.78414c0,0.09527-0.00238,0.19173-0.00476,0.28701C8.32809,9.44867,8.32095,9.83929,8.38883,10.2418c0.1703,1.0063,1.05992,1.7566,2.07697,1.7566c0.0107,0,0.0214,0,0.0321,0c0.0048,0,0.0108,0,0.0167,0c0.5514,0,1.0742-0.2239,1.4744-0.6312c0.4001-0.4061,0.624-0.9563,0.6145-1.50766c-0.0214-1.31716-0.0214-2.54142,0-3.74187C12.6142,5.52459,12.3451,4.92556,11.8842,4.51469z M11.7699,9.87383c0.0059,0.32987-0.1311,0.66097-0.3752,0.90867c-0.2417,0.2465-0.555,0.3811-0.8801,0.3811c0,0-0.0083,0-0.0119,0c-0.0059,0-0.0119,0-0.0179,0c-0.67997,0.0107-1.18492-0.5312-1.27424-1.0611C9.15578,9.77736,9.16174,9.44152,9.16888,9.08663C9.17126,8.98778,9.17246,8.88775,9.17365,8.7889C9.17484,8.48879,9.17126,8.1851,9.1665,7.89214C9.15816,7.26929,9.14864,6.62381,9.19746,6.00096C9.24629,5.3793,9.67502,4.92318,10.2907,4.83981c0.0727-0.00952,0.1406-0.01429,0.2072-0.01429c0.3931,0,0.667,0.16316,0.8337,0.31202c0.2787,0.24771,0.4466,0.6169,0.4406,0.96465c-0.0226,1.21116-0.0226,2.44495,0,3.77164H11.7699z M6.91922,8.01143c0.17626-0.15958,0.33584-0.35847,0.4323-0.58236c0.27034-0.61571,0.43469-1.61965,0.00715-2.41995C7.0788,4.48393,6.59529,4.14571,5.96172,4.03257C5.24955,3.90514,4.5874,4.07782,4.09674,4.52085C3.61561,4.95434,3.35718,5.60458,3.40601,6.2584C3.42268,6.48824,3.62514,6.66212,3.8526,6.64306c0.22985-0.01667,0.40253-0.21674,0.38467-0.44659C4.2075,5.79632,4.36351,5.40093,4.65409,5.13893C4.8625,4.95077,5.23288,4.74831,5.81405,4.85192c0.38347,0.06907,0.64905,0.2489,0.80863,0.54901C6.89064,5.9035,6.79775,6.61329,6.58576,7.0968C6.47858,7.34571,6.19871,7.52673,6.0951,7.57555c-0.12385,0-0.43349-0.00357-0.60617-0.00357c-0.22985,0-0.41683,0.18697-0.41683,0.41682s0.18698,0.41682,0.41683,0.41682c0.17149,0,0.47756,0.00239,0.60022,0.00358C6.3059,8.54496,6.42261,8.69502,6.55599,8.88556c0.32393,0.46208,0.37514,0.96346,0.15482,1.53394c-0.17387,0.4501-0.5252,0.6955-1.07659,0.7502c-0.38824,0.0382-0.75266-0.094-1.02896-0.3727C4.3385,10.5278,4.19678,10.1539,4.2337,9.82163c0.00714-0.06074,0.00476-0.11552,0.00357-0.15601V9.63346c0-0.22985-0.18697-0.41682-0.41801-0.41682c-0.23104,0-0.41682,0.18697-0.41682,0.41682c0,0.01906,0,0.03811,0,0.05717c0,0.0131,0.00119,0.0262,0,0.03691C3.33813,10.3135,3.5644,10.9316,4.0098,11.3817c0.40015,0.4049,0.93607,0.6265,1.49461,0.6265c0.06907,0,0.13934-0.0036,0.20841-0.0108c0.86937-0.0857,1.48269-0.5287,1.77209-1.2802c0.31797-0.82531,0.23104-1.62442-0.2501-2.31158c-0.0917-0.131-0.19173-0.26438-0.32035-0.39538L6.91922,8.01143z" className="sc-iBPRYJ brBpOV"></path>
                                    </svg>
                                    <div className='flex items-center justify-center w-[40%] bg-grayBg rounded-lg p-2' id="wholeID ">
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">Yes</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="wholeID" value="value1" />
                                        </label>
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">No</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="wholeID" value="value2" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>
                                        Whole 30
                                    </h3>
                                    <p className='text-[12px] mb-1'>
                                        Similar to paleo, but excludes processed meats and allows for ghee/clarified butter.
                                    </p>
                                    <Link to="" className='font-semibold'>Learn More</Link>
                                </div>
                            </div>
                            {/* Column #6 */}
                            <div className='md:col-span-6 col-span-12 border border-borderClr p-4 rounded-lg'>
                                <div className='flex items-center justify-between gap-x-2'>
                                    <svg height="36" width="36" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.76525,4.32751a3.70587,3.70587,0,0,0-2.687-1.406,3.7621,3.7621,0,0,0-1.406-2.687,1.01317,1.01317,0,0,0-1.28095,0,3.66881,3.66881,0,0,0-1.37474,2.687,3.18941,3.18941,0,0,0,.18748,1.31224,4.3814,4.3814,0,0,0-1.24977-.2187A4.06524,4.06524,0,0,0,4.29876,6.26462L.08084,14.95038a.72037.72037,0,0,0,.96856.96861l8.68574-4.218a4.27785,4.27785,0,0,0,1.84344-1.8746,3.94953,3.94953,0,0,0,.21865-3.03065,3.4266,3.4266,0,0,0,1.12478.21871,3.65614,3.65614,0,0,0,2.84324-1.406A.9925.9925,0,0,0,15.76525,4.32751ZM10.70375,9.389a3.2181,3.2181,0,0,1-1.406,1.406L5.39229,12.70082,4.36124,11.63853a.50815.50815,0,1,0-.7186.71866l.81233.78105-3.12438,1.531L4.8299,7.51438l.81234.84358a.50813.50813,0,0,0,.71861-.71861L5.29856,6.57706A2.99894,2.99894,0,0,1,7.95428,5.01487a3.34256,3.34256,0,0,1,1.34345.28119,3.117,3.117,0,0,1,1.531,1.74966A3.04388,3.04388,0,0,1,10.70375,9.389ZM12.922,6.01467a2.59872,2.59872,0,0,1-1.87463-.84358l-.21865-.21871a2.56114,2.56114,0,0,1,.21865-3.93672,2.57564,2.57564,0,0,1,.78115,3.15563,2.55357,2.55357,0,0,1,1.09348-.25,2.66233,2.66233,0,0,1,2.0621,1.031A2.60476,2.60476,0,0,1,12.922,6.01467Z" className="sc-iBPRYJ brBpOV"></path>
                                    </svg>
                                    <div className='flex items-center justify-center w-[40%] bg-grayBg rounded-lg p-2' id="lowFoodMapID">
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">Yes</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="lowFoodMapID" value="value1" />
                                        </label>
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">No</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="lowFoodMapID" value="value2" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>
                                        Low FODMAP
                                    </h3>
                                    <p className='text-[12px] mb-1'>
                                        Avoids foods with certain types of carbohydrates, such as cauliflower and asparagus.
                                    </p>
                                    <Link to="" className='font-semibold'>Learn More</Link>
                                </div>
                            </div>
                            {/* Column #7 */}
                            <div className='md:col-span-6 col-span-12 border border-borderClr p-4 rounded-lg'>
                                <div className='flex items-center justify-between gap-x-2'>
                                    <svg height="36" width="36" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.92089,4.59464a.41728.41728,0,0,0-.41683.41682v4.9173c0,.27034-.0393.40134-.14886.499a.538.538,0,0,1-.36085.1405c-.11075.0036-.22151.0024-.33227,0-.12861-.0012-.26081-.0024-.39657.0024a.59437.59437,0,0,1-.43945-.1441.56953.56953,0,0,1-.1441-.43234V9.59412a.41683.41683,0,1,0-.83365,0v.38824A1.37072,1.37072,0,0,0,2.24489,11.022a1.39915,1.39915,0,0,0,.98846.3811c.02144,0,.04407,0,.0655-.0012.11433-.0047.231-.0035.35371-.0024.11909.0012.24294.0024.36918-.0011a1.36853,1.36853,0,0,0,.88724-.3502,1.39854,1.39854,0,0,0,.42873-1.123V5.00789a.41729.41729,0,0,0-.41682-.41683ZM7.56354,8.82479a3.94364,3.94364,0,0,1,.03215.449.41745.41745,0,0,0,.41682.40611h.01072a.41668.41668,0,0,0,.40611-.42754,4.50329,4.50329,0,0,0-.04049-.54783A4.97625,4.97625,0,0,0,7.21341,6.07138a.41682.41682,0,1,0-.62524.5514A4.14784,4.14784,0,0,1,7.56235,8.8236ZM7.9994,0a7.9994,7.9994,0,1,0,7.9994,7.9994A8.00811,8.00811,0,0,0,7.9994,0Zm0,15.1664a7.171,7.171,0,1,1,6.687-4.5946H14.216a2.16643,2.16643,0,0,0-.2858-1.10995A2.125,2.125,0,0,0,12.1914,8.3674c-.2882-.01906-.3977-.01787-.5371-.01667-.0845,0-.1846.00238-.356-.00239h-.0096a.41688.41688,0,0,0-.0095.83365c.1858.00476.293.00357.3847.00238.1298-.00119.2167-.00238.4728.01548a1.30317,1.30317,0,0,1,1.0825.6955,1.34527,1.34527,0,0,1,.1643.67645c-.967,0-2.1234-.0012-2.6938-.006-.2132,0-.3918-.0714-.5979-.4001a2.00332,2.00332,0,0,0,.0763-.35253,4.52736,4.52736,0,0,0,.044-.59426c-.0023-.48828,0-.98609.0024-1.46722.0048-.90152.0095-1.834-.0214-2.75578a.41789.41789,0,0,0-.41684-.40373H9.762a.41574.41574,0,0,0-.40253.42993c.02978.90509.025,1.83044.02025,2.72363-.00238.48351-.00476.9837-.00238,1.47674a3.78521,3.78521,0,0,1-.03811.4847c-.02978.2358-.10838.85982-1.36837.85982-.47637-.0012-.95154,0-1.42791,0H5.957a.41685.41685,0,0,0,0,.8337H7.96963A2.46491,2.46491,0,0,0,9.606,10.9064a1.38512,1.38512,0,0,0,1.07894.4907c.6646.0048,2.0818.006,3.1202.006h.4966a7.17158,7.17158,0,0,1-6.30349,3.7597Z" className="sc-iBPRYJ brBpOV"></path>
                                    </svg>
                                    <div className='flex items-center justify-center w-[40%] bg-grayBg rounded-lg p-2' id="halalID">
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">Yes</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="halalID" value="value1" />
                                        </label>
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">No</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="halalID" value="value2" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>
                                        Halal
                                    </h3>
                                    <p className='text-[12px] mb-1'>
                                        Meat prepared in accordance with Islamic law.
                                    </p>
                                </div>
                            </div>
                            {/* Column #8 */}
                            <div className='md:col-span-6 col-span-12 border border-borderClr p-4 rounded-lg'>
                                <div className='flex items-center justify-between gap-x-2'>
                                    <svg height="36" width="36" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M 8.367188 6.53125 L 13.054688 12.972656 C 14.246094 14.632812 14.375 14.800781 15 15.5 L 10.824219 15.5 C 10.523438 14.890625 10.03125 14.023438 9.578125 13.378906 L 6.214844 8.46875 L 4.25 10.390625 L 4.25 12.953125 C 4.25 14.0625 4.289062 14.632812 4.417969 15.5 L 1 15.5 C 1.113281 14.613281 1.152344 13.988281 1.152344 12.953125 L 1.152344 3.046875 C 1.152344 1.996094 1.113281 1.347656 1 0.5 L 4.417969 0.5 C 4.304688 1.199219 4.25 1.9375 4.25 3.046875 L 4.25 6.847656 L 8.539062 2.417969 C 9.257812 1.699219 9.730469 1.089844 10.085938 0.5 L 14.394531 0.5 C 13.902344 0.960938 12.976562 1.882812 12.375 2.492188 Z M 8.367188 6.53125" className="sc-iBPRYJ brBpOV"></path>
                                    </svg>
                                    <div className='flex items-center justify-center w-[40%] bg-grayBg rounded-lg p-2' id="kosherID">
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">Yes</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="kosherID" value="value1" />
                                        </label>
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">No</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="kosherID" value="value2" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>
                                        Kosher
                                    </h3>
                                    <p className='text-[12px] mb-1'>
                                        Every major, minor and accompanying ingredient prepared in accordance with Jewish dietary law.
                                    </p>
                                </div>
                            </div>
                            {/* Column #9 */}
                            <div className='md:col-span-6 col-span-12 border border-borderClr p-4 rounded-lg'>
                                <div className='flex items-center justify-between gap-x-2'>
                                    <svg height="36" width="36" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.97068,11.3177a10.14417,10.14417,0,0,0-7.58821-3.118.40791.40791,0,0,0,.02482.815,9.25547,9.25547,0,0,1,6.997,2.8736,12.38382,12.38382,0,0,1,2.28684,3.0749.38752.38752,0,0,0,.528.1852.41386.41386,0,0,0,.1805-.5461,13.01817,13.01817,0,0,0-2.43015-3.2846ZM6.1994,12.7301A7.0811,7.0811,0,0,0,.99619,10.4189H.986a.408.408,0,0,0-.01016.8151,6.27725,6.27725,0,0,1,5.86321,3.9913.39533.39533,0,0,0,.37343.2736.39058.39058,0,0,0,.12974-.0221.41135.41135,0,0,0,.24369-.5193,6.99919,6.99919,0,0,0-1.38429-2.2274Zm9.3899-4.70034a10.20237,10.20237,0,0,0-5.5574,1.68361A11.53275,11.53275,0,0,0,8.82246,8.5863,10.23627,10.23627,0,0,1,15.4856,6.728a.40794.40794,0,0,0,.027-.815,10.73129,10.73129,0,0,0-7.3569,2.1738l-.035-.02445a.40438.40438,0,0,0,.28769-.39V4.20378a2.238,2.238,0,0,0,.53927.0687,2.29035,2.29035,0,0,0,1.646-.6986A2.43508,2.43508,0,0,0,11.0755.91457a.39862.39862,0,0,0-.202-.20842,2.25514,2.25514,0,0,0-2.57677.49717,2.34783,2.34783,0,0,0-.28431.35628,2.40686,2.40686,0,0,0-.2843-.35628A2.2807,2.2807,0,0,0,5.15246.70615a.39863.39863,0,0,0-.20195.20842,2.43511,2.43511,0,0,0,.48174,2.65931,2.29233,2.29233,0,0,0,1.646.6986,2.24711,2.24711,0,0,0,.5404-.0687V7.67231a.45715.45715,0,0,0,.00677.06869,13.0207,13.0207,0,0,0-7.102-1.83264.4078.4078,0,0,0,.00452.815H.53252A11.94561,11.94561,0,0,1,7.9154,8.89485a.38107.38107,0,0,0,.07784.05822A10.9927,10.9927,0,0,1,9.49261,10.3072a10.83852,10.83852,0,0,1,2.26319,3.6804.396.396,0,0,0,.3768.2841.381.381,0,0,0,.1184-.0186.40953.40953,0,0,0,.2573-.5112,8.96029,8.96029,0,0,0-.633-1.4472,8.84633,8.84633,0,0,1,3.2165-1.0514.40645.40645,0,0,0,.334-.4622.39654.39654,0,0,0-.4479-.3447,9.57327,9.57327,0,0,0-3.5064,1.1562,12.33684,12.33684,0,0,0-.9037-1.2691,9.66122,9.66122,0,0,1,5.0554-1.48337.40747.40747,0,0,0-.0327-.81387ZM8.85518,1.77966a1.48561,1.48561,0,0,1,1.55352-.38539,1.60265,1.60265,0,0,1-.3734,1.60327,1.48931,1.48931,0,0,1-1.628.35745V2.93816l-.00113-.01164.00113-.01979A1.58892,1.58892,0,0,1,8.85518,1.77966ZM5.98958,2.99754a1.60271,1.60271,0,0,1-.37343-1.60327,1.48559,1.48559,0,0,1,1.55351.38539,1.58827,1.58827,0,0,1,.44677,1.15385V3.355a1.48481,1.48481,0,0,1-1.628-.35745Z" className="sc-iBPRYJ brBpOV"></path>
                                    </svg>
                                    <div className='flex items-center justify-center w-[40%] bg-grayBg rounded-lg p-2' id="organicID">
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">Yes</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="organicID" value="value1" />
                                        </label>
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">No</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="organicID" value="value2" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>
                                        Organic
                                    </h3>
                                    <p className='text-[12px] mb-1'>
                                        Every major, minor, and accompanying ingredient is certified organic.
                                    </p>
                                </div>
                            </div>
                            {/* Column #10 */}
                            <div className='md:col-span-6 col-span-12 border border-borderClr p-4 rounded-lg'>
                                <div className='flex items-center justify-between gap-x-2'>
                                    <svg height="36" width="36" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.18332,3.104a.39719.39719,0,0,0,.39425-.39921V2.64091a.39429.39429,0,1,0-.78851,0v.06387A.39719.39719,0,0,0,7.18332,3.104Zm1.19629,0a.39719.39719,0,0,0,.39425-.39921V2.64091a.39429.39429,0,1,0-.78851,0v.06387A.39719.39719,0,0,0,8.37961,3.104Zm1.19629,0a.39719.39719,0,0,0,.39425-.39921V2.64091a.39429.39429,0,1,0-.78851,0v.06387A.39719.39719,0,0,0,9.5759,3.104Zm2.0039,1.1476V3.46116A2.94724,2.94724,0,0,0,8.65447.499h-.5497A2.94725,2.94725,0,0,0,5.17939,3.46116v.79043L3.90539,14.493a.90352.90352,0,0,0,.214.7038.87862.87862,0,0,0,.66235.3034H11.9752a.87685.87685,0,0,0,.6624-.3034.90381.90381,0,0,0,.214-.7038L11.5776,4.25159Zm-3.475-2.953h.5497A2.15284,2.15284,0,0,1,10.7913,3.4623v.41631H5.969V3.4623A2.15286,2.15286,0,0,1,8.10589,1.29858ZM12.0473,14.6687a.09371.09371,0,0,1-.0709.033H4.78289a.09.09,0,0,1-.071-.033.09188.09188,0,0,1-.02253-.0753L5.92285,4.67589H10.8386l1.2335,9.91751a.09589.09589,0,0,1-.0225.0753ZM8.3796,7.67439a.89923.89923,0,0,1,.95522.8258.39427.39427,0,1,0,.78848,0A1.68888,1.68888,0,0,0,8.3796,6.876,1.68892,1.68892,0,0,0,6.63586,8.50019,1.68892,1.68892,0,0,0,8.3796,10.1244a.89923.89923,0,0,1,.95522.8258.89851.89851,0,0,1-.95522.8258.89852.89852,0,0,1-.95523-.8258.39429.39429,0,1,0-.78851,0A1.68889,1.68889,0,0,0,8.3796,12.5744a1.68885,1.68885,0,0,0,1.7437-1.6242A1.68887,1.68887,0,0,0,8.3796,9.326a.89923.89923,0,0,1-.95523-.82579A.89852.89852,0,0,1,8.3796,7.67439Z" className="sc-iBPRYJ brBpOV"></path><path d="M15.9381,3.11441a.391.391,0,0,0-.5441-.122L12.8696,4.61772a.4017.4017,0,0,0-.1205.5509.39169.39169,0,0,0,.5452.12205l2.5244-1.62535a.4018.4018,0,0,0,.1205-.55091ZM2.72822,11.0836.18584,12.6907a.40222.40222,0,0,0-.12616.5498.39067.39067,0,0,0,.54294.1277L3.145,11.76a.40226.40226,0,0,0,.12617-.5498A.39058.39058,0,0,0,2.72822,11.0836Z" className="sc-iBPRYJ sc-jrAGrp brBpOV iNWkQp"></path>
                                    </svg>
                                    <div className='flex items-center justify-center w-[40%] bg-grayBg rounded-lg p-2' id="sodiumID">
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">Yes</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="sodiumID" value="value1" />
                                        </label>
                                        <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                            <div className='flex justify-center items-center w-full'>
                                                <span className="text-base font-semibold">No</span>
                                            </div>
                                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="sodiumID" value="value2" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>
                                        Low Sodium
                                    </h3>
                                    <p className='text-[12px] mb-1'>
                                        Foods that have less than 140mg of sodium (or salt) per serving.
                                    </p>
                                </div>
                            </div>
                            <div className='col-span-12'>
                                <div className='flex gap-x-2 w-full bg-grayBg rounded-lg p-3'>
                                    <input className='mb-3 !w-[50px] mt-1' type="checkbox" />
                                    <p className='mb-0'>
                                        You said this dish meets the criteria for one or more dietary preferences. By
                                        checking this box, you are confirming that this information is accurate, and
                                        that you will take all necessary precautions to ensure your dish meets this
                                        criteria for the health and safety of your customers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DitaryScreen;
