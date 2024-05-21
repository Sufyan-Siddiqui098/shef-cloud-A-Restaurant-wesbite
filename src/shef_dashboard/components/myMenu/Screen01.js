import React, { useState } from 'react';
import Select from 'react-select';
import ServingSizeModal from './ServingSizeModal';

const DetailStep = () => {
    // Dish cuisine tags Start
    const [cusineSelectedOptions, setcusineSelectedOptions] = useState([]);
    const options = [
        { value: 'Mexican', label: 'Mexican' },
        { value: 'North Macedonian', label: 'North Macedonian' },
        { value: 'Swedish', label: 'Swedish' },
        { value: 'American', label: 'American' },
        { value: 'Persion', label: 'Persion' },
        // Add more options as needed
    ];
    const handleCusineSelectChange = (selectedValues) => {
        setcusineSelectedOptions(selectedValues);
    };
    // Dish cuisine tags End

    // Serving Sizing Modal Work Start
    const [isServSizeModalOpen, setServSizeModalOpen] = useState(false);

    const openServSizeModal = () => {
        setServSizeModalOpen(true);
    };

    const closeServSizeModal = () => {
        setServSizeModalOpen(false);
    };
    // Serving Sizing Modal Work End

    return (
        <div>
            <div className='container mx-auto'>
                <div className='lg:w-2/3 sm:w-4/5 w-full mx-auto'>
                    <h2 className='text-2xl font-semibold border-b mb-8 pb-2'>Dish Detail</h2>
                    <div className=''>
                        <h3 className='text-lg font-semibold mb-1 leading-tight'>Dish Name</h3>
                        <p className='text-[12px]'>Example: Mama Maria's Lasagna</p>
                        <input
                            type="text"
                            placeholder="Name your Dish"
                        />
                    </div>
                    <div className='mt-7 mb-5 border-b'></div>
                    <div>
                        <h3 className='text-lg font-semibold mb-2 leading-tight'>Food Type</h3>
                        <div className='grid md:grid-cols-6 grid-cols-3 gap-3 mb-4' id='group1'>
                            {/* Type #1 */}
                            <label className="flex items-center justify-center cursor-pointer rounded-md px-3 border border-borderClr py-4 p-relative foodTypeRadio">
                                <div className='text-center'>
                                    <div className='mb-3'>
                                        <svg className="mx-auto" height="30" width="30" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.59137,15.5H14.4075a.37779.37779,0,0,0,.3472-.2312l.8388-1.9884h.0281a.37986.37986,0,0,0,0-.7597H15.324A7.37649,7.37649,0,0,0,9.1655,5.59482a1.50255,1.50255,0,1,0-2.33208,0A7.37834,7.37834,0,0,0,.67385,12.5217H.37736a.37991.37991,0,0,0,0,.7598h.028l.83881,1.9884a.378.378,0,0,0,.34717.2312Zm5.724-11.15228a.746.746,0,1,1,.96065.99312.73724.73724,0,0,1-.57035-.0076A.75288.75288,0,0,1,7.31536,4.34772Zm.66847,1.91136H8A6.60891,6.60891,0,0,1,14.5682,12.487l-13.13747.0326A6.6071,6.6071,0,0,1,7.98491,6.26016ZM14.1585,14.7403H1.84151l-.61563-1.461H14.7741Zm-1.0124-3.3639a4.77416,4.77416,0,0,0-1.4253-2.75361.267.267,0,0,0-.3806.01085.2722.2722,0,0,0,.0107.38314,4.22113,4.22113,0,0,1,1.2626,2.43782.27052.27052,0,0,0,.2663.2322.17266.17266,0,0,0,.0399-.0032.271.271,0,0,0,.2275-.3083ZM4.4.77135a.26955.26955,0,1,0-.53908,0,.67365.67365,0,0,1-.23181.50687,1.20635,1.20635,0,0,0,0,1.72793.67007.67007,0,0,1,0,1.01375,1.19914,1.19914,0,0,0-.36442.86505.26955.26955,0,1,0,.53908,0,.67192.67192,0,0,1,.23181-.50688,1.20763,1.20763,0,0,0,0-1.729.67007.67007,0,0,1,0-1.01375A1.19841,1.19841,0,0,0,4.4.77135Zm8.28468,0a.26956.26956,0,1,0-.5391,0,.67385.67385,0,0,1-.2318.50687,1.20617,1.20617,0,0,0,0,1.72793.67009.67009,0,0,1,0,1.01375,1.19916,1.19916,0,0,0-.3645.86505.26956.26956,0,1,0,.5391,0,.67211.67211,0,0,1,.2318-.50688,1.20745,1.20745,0,0,0,0-1.729.67009.67009,0,0,1,0-1.01375A1.19844,1.19844,0,0,0,12.6847.77135ZM2.39678,3.51305a.26955.26955,0,1,0-.53908,0,.67189.67189,0,0,1-.2318.50687,1.2089,1.2089,0,0,0,0,1.7301.67739.67739,0,0,1,.2318.50687.26955.26955,0,1,0,.53908,0,1.20556,1.20556,0,0,0-.36442-.86505.67008.67008,0,0,1,0-1.01374A1.19913,1.19913,0,0,0,2.39678,3.51305Zm12.34182,0a.26956.26956,0,1,0-.5391,0,.67209.67209,0,0,1-.2318.50687,1.20617,1.20617,0,0,0,0,1.72793.67767.67767,0,0,1,.2318.50687.26956.26956,0,1,0,.5391,0,1.20032,1.20032,0,0,0-.3645-.864.67009.67009,0,0,1,0-1.01375A1.19846,1.19846,0,0,0,14.7386,3.51305Z" className="sc-iBPRYJ brBpOV"></path>
                                        </svg>
                                    </div>
                                    <h4 className='text-[14px] font-bold mb-0 leading-tight'>Main</h4>
                                </div>
                                <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="group1" value="value1" />
                            </label>
                            {/* Type #2 */}
                            <label className="flex items-center justify-center cursor-pointer rounded-md px-3 border border-borderClr py-4 p-relative foodTypeRadio">
                                <div className='text-center'>
                                    <div className='mb-3'>
                                        <svg className="mx-auto" height="30" width="30" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.32868.27764a.26368.26368,0,1,0-.52663,0,.7619.7619,0,0,1-.24014.55307,1.323,1.323,0,0,0,0,1.83688.757.757,0,0,1,0,1.10613,1.30233,1.30233,0,0,0-.37075.91844.26369.26369,0,1,0,.52663,0,.7619.7619,0,0,1,.24014-.55306,1.323,1.323,0,0,0,0-1.83689.75694.75694,0,0,1,0-1.10612A1.30236,1.30236,0,0,0,9.32868.27764ZM7.27483,2.56329a.26369.26369,0,1,0-.52663,0,.76188.76188,0,0,1-.24014.55306,1.323,1.323,0,0,0,0,1.83689.76188.76188,0,0,1,.24014.55306.26368.26368,0,1,0,.52663,0,1.30233,1.30233,0,0,0-.37075-.91844.757.757,0,0,1,0-1.10613A1.30233,1.30233,0,0,0,7.27483,2.56329Zm4.06557,0a.26367.26367,0,1,0-.5266,0,.76166.76166,0,0,1-.2402.55306,1.32312,1.32312,0,0,0,0,1.83689.76166.76166,0,0,1,.2402.55306.26367.26367,0,1,0,.5266,0,1.30258,1.30258,0,0,0-.3707-.91844.75682.75682,0,0,1,0-1.10613A1.30258,1.30258,0,0,0,11.3404,2.56329ZM5.72234,16.0001H11.9134a.37946.37946,0,0,0,.3686-.3887V13.8511A4.61258,4.61258,0,0,0,16,9.24V7.70632a.3795.3795,0,0,0-.3686-.3887H3.88546L2.09177,2.78871l-.00843-.02a1.11622,1.11622,0,0,0-.62668-.58861,1.03916,1.03916,0,0,0-.83734.05109A1.18743,1.18743,0,0,0,.10954,3.77711l.00632.01333L1.90218,7.33649a.38535.38535,0,0,0-.26542.37094V9.24112a4.61261,4.61261,0,0,0,3.718,4.61108v1.7603a.37951.37951,0,0,0,.36864.3887ZM6.091,13.9122H11.5447v1.3105H6.091ZM.93951,2.932a.35079.35079,0,0,1,.47607.1677L3.086,7.31873H2.72793L.771,3.43284A.38961.38961,0,0,1,.93951,2.932ZM2.373,9.24112v-1.145H15.2627v1.145A3.80218,3.80218,0,0,1,11.569,13.1359H6.06781A3.80223,3.80223,0,0,1,2.374,9.24112Zm7.70141-.02427a.27087.27087,0,0,0-.26333-.27764H3.501a.278.278,0,0,0,0,.55528H9.81107A.27087.27087,0,0,0,10.0744,9.21685Z" className="sc-iBPRYJ brBpOV"></path>
                                        </svg>
                                    </div>
                                    <h4 className='text-[14px] font-bold mb-0 leading-tight'>Appetizer</h4>
                                </div>
                                <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="group1" value="value2" />
                            </label>
                            {/* Type #3 */}
                            <label className="flex items-center justify-center cursor-pointer rounded-md px-3 border border-borderClr py-4 p-relative foodTypeRadio">
                                <div className='text-center'>
                                    <div className='mb-3'>
                                        <svg className="mx-auto" height="30" width="30" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.1384,15.3974H13.127a4.73872,4.73872,0,0,0,2.3742-4.1185V8.89256a.41377.41377,0,0,0-.4096-.417H.90955A.41376.41376,0,0,0,.5,8.89256V11.2789a4.7363,4.7363,0,0,0,2.37421,4.1185H.86274a.2979.2979,0,0,0,0,.5957H4.88568c.08308.0047.16733.0071.25158.0071H10.8627c.0843,0,.1685-.0024.2516-.0071h4.023a.2979.2979,0,0,0,0-.5957ZM1.3191,11.2789V9.30954H14.6809V10.5069H7.51381a.29785.29785,0,0,0,0,.5956H14.6809v.1764a3.858,3.858,0,0,1-3.8182,3.8874H5.13726A3.858,3.858,0,0,1,1.3191,11.2789ZM4.61422,2.71315a2.93539,2.93539,0,0,0-3.15586-.73983.29539.29539,0,0,0-.17084.168A3.0677,3.0677,0,0,0,1.903,5.37823a2.95161,2.95161,0,0,0,2.1355.92212h.05383A1.36512,1.36512,0,0,0,4.695,6.149a3.70677,3.70677,0,0,1,.31008.93284.2926.2926,0,1,0,.57454-.1108,4.41215,4.41215,0,0,0-.42125-1.2128,1.42275,1.42275,0,0,0,.28435-.78392A3.06492,3.06492,0,0,0,4.61422,2.71315ZM3.52833,3.85924a.28877.28877,0,0,0-.406.07863.30066.30066,0,0,0,.07723.41341A5.25739,5.25739,0,0,1,4.40125,5.6308a.79073.79073,0,0,1-.31827.07386,2.32513,2.32513,0,0,1-1.75872-.73983,2.46119,2.46119,0,0,1-.53944-2.47327,2.35667,2.35667,0,0,1,2.40932.63619,2.42433,2.42433,0,0,1,.66464,1.81563.82787.82787,0,0,1-.048.23828A5.672,5.672,0,0,0,3.5295,3.85924ZM10.7329,7.31869a.28629.28629,0,0,0,.055.00476.29322.29322,0,0,0,.2867-.243,3.76828,3.76828,0,0,1,.31-.93283,1.36123,1.36123,0,0,0,.6027.1513h.0538a2.95707,2.95707,0,0,0,2.1367-.92211,3.0698,3.0698,0,0,0,.6155-3.23694.29561.29561,0,0,0-.1709-.168,2.93578,2.93578,0,0,0-3.1558.73984,3.06765,3.06765,0,0,0-.8285,2.2612,1.40767,1.40767,0,0,0,.2843.78392,4.37626,4.37626,0,0,0-.4212,1.21281.29672.29672,0,0,0,.2328.34788Zm.4891-2.37677a2.42606,2.42606,0,0,1,.6646-1.81564,2.3683,2.3683,0,0,1,1.7166-.741,2.3436,2.3436,0,0,1,.6927.10483,2.46247,2.46247,0,0,1-.5394,2.47327,2.32925,2.32925,0,0,1-1.7587.73984.78614.78614,0,0,1-.3183-.07386,5.21627,5.21627,0,0,1,1.2018-1.27953.3007.3007,0,0,0,.0772-.4134.28882.28882,0,0,0-.4061-.07863,5.64367,5.64367,0,0,0-1.2813,1.32241.8419.8419,0,0,1-.0479-.23827ZM8.134,6.45261a.29532.29532,0,0,0,.29253-.29784v-.766a1.38015,1.38015,0,0,0,.65177-.34907A3.0739,3.0739,0,0,0,8.25333.0264a.28515.28515,0,0,0-.23754,0,3.07384,3.07384,0,0,0-.82494,5.01325,1.38012,1.38012,0,0,0,.65176.34907v.766a.29533.29533,0,0,0,.29254.29784Zm-.54529-1.849A2.47364,2.47364,0,0,1,8.134.628a2.47364,2.47364,0,0,1,.54528,3.97558.80839.80839,0,0,1-.25275.16321V2.8261a.29258.29258,0,1,0-.58507,0V4.76683A.81628.81628,0,0,1,7.58869,4.60362ZM6.449,10.8047a.29539.29539,0,0,0-.29254-.2979H4.93835a.2979.2979,0,0,0,0,.5957H6.15646A.29531.29531,0,0,0,6.449,10.8047Z" className="sc-iBPRYJ brBpOV"></path>
                                        </svg>
                                    </div>
                                    <h4 className='text-[14px] font-bold mb-0 leading-tight'>Side</h4>
                                </div>
                                <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="group1" value="value3" />
                            </label>
                            {/* Type #4 */}
                            <label className="flex items-center justify-center cursor-pointer rounded-md px-3 border border-borderClr py-4 p-relative foodTypeRadio">
                                <div className='text-center'>
                                    <div className='mb-3'>
                                        <svg className="mx-auto" height="30" width="30" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.53756,15.2164v-1.86A6.29529,6.29529,0,0,0,13.4542,7.03052a.38914.38914,0,0,0-.3853-.39194h-.1663a2.85594,2.85594,0,0,0-.7542-1.39753l2.7701-2.81747a.2832.2832,0,0,0,0-.39642.27192.27192,0,0,0-.3898,0L11.7202,4.88383A2.77375,2.77375,0,0,0,9.712,4.44262a2.83622,2.83622,0,0,0-1.60742-1.383,1.1022,1.1022,0,0,0,.07487-.14334,1.044,1.044,0,0,0-.53288-1.36058.945.945,0,0,0-.12991-.04592.32435.32435,0,0,0,.0033-.03247A1.46852,1.46852,0,0,0,6.06555-.00195a.27773.27773,0,0,0-.27524.28.27773.27773,0,0,0,.27524.28.91233.91233,0,0,1,.9039.91937.32438.32438,0,0,0,.00331.03247,1.02383,1.02383,0,0,0-.66389.58791,1.04087,1.04087,0,0,0-.00991.79283,1.015,1.015,0,0,0,.07927.159A2.84568,2.84568,0,0,0,4.74108,4.44262a2.77876,2.77876,0,0,0-.4514-.037A2.81087,2.81087,0,0,0,1.55156,6.63747H1.38641a.3891.3891,0,0,0-.38534.39193,6.29277,6.29277,0,0,0,5.9871,6.3281v1.8578h-3.707a.392.392,0,0,0,0,.7839H11.2434a.392.392,0,0,0,0-.7839H7.53756ZM6.80981,2.68562a.48406.48406,0,0,1,.00441-.36394.46741.46741,0,0,1,.43048-.2878.44536.44536,0,0,1,.18386.0392.48048.48048,0,0,1,.24552.62486.46814.46814,0,0,1-.20919.22956c-.07927-.00672-.15854-.0112-.23891-.0112-.07046,0-.13982.00336-.20918.009a.469.469,0,0,1-.20809-.2374ZM4.28858,5.19178a2.03053,2.03053,0,0,1,.567.08174.38476.38476,0,0,0,.46792-.2374,2.0236,2.0236,0,0,1,3.80717,0,.38322.38322,0,0,0,.46791.2374,2.02213,2.02213,0,0,1,2.508,1.36618h-9.759A2.037,2.037,0,0,1,4.28968,5.19178ZM1.78386,7.42246H12.6703A5.50335,5.50335,0,0,1,7.22708,12.5804,5.50331,5.50331,0,0,1,1.78386,7.42246Z" className="sc-iBPRYJ brBpOV"></path>
                                        </svg>
                                    </div>
                                    <h4 className='text-[14px] font-bold mb-0 leading-tight'>Dessert</h4>
                                </div>
                                <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="group1" value="value4" />
                            </label>
                            {/* Type #5 */}
                            <label className="flex items-center justify-center cursor-pointer rounded-md px-3 border border-borderClr py-4 p-relative foodTypeRadio">
                                <div className='text-center'>
                                    <div className='mb-3'>
                                        <svg className="mx-auto" height="30" width="30" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.1619,10.4143a.38881.38881,0,0,0-.5443.127,1.84769,1.84769,0,0,1-3.17431,0,.38877.38877,0,0,0-.54426-.127.40993.40993,0,0,0-.124.5576,2.62559,2.62559,0,0,0,4.50963,0,.40991.40991,0,0,0-.124-.5576ZM14.0507,6.557h-.1915a6.28286,6.28286,0,0,0-4.593-4.09286,3.63823,3.63823,0,0,0,.32-.26555,1.10862,1.10862,0,0,1,.835-.39139.40421.40421,0,0,0,0-.80818,1.85589,1.85589,0,0,0-1.3545.59113,1.08757,1.08757,0,0,1-1.6711,0A1.85868,1.85868,0,0,0,6.04.999a.40421.40421,0,0,0,0,.80818,1.111,1.111,0,0,1,.83612.39139c.07437.067.15437.1374.24227.20667A6.26815,6.26815,0,0,0,2.20087,6.557H1.94846a1.99794,1.99794,0,0,0,0,3.9947h.17916A6.19613,6.19613,0,0,0,8.03,15.0002a6.19378,6.19378,0,0,0,5.90129-4.4485h.1183a1.99794,1.99794,0,0,0,0-3.9947Zm0,3.18654H13.636c-.009,0-.018.00231-.0259.00231a.27065.27065,0,0,0-.0428.00462c-.0124.00231-.0248.00577-.0372.00923a.32618.32618,0,0,0-.036.01155c-.0124.00462-.0237.01154-.0361.01732l-.0316.01731a.321.321,0,0,0-.0315.0231.29035.29035,0,0,0-.0282.02424.31618.31618,0,0,0-.0259.02886.30971.30971,0,0,0-.0237.03c-.0078.01155-.0146.02309-.0214.03464a.2936.2936,0,0,0-.0169.03233c-.0056.01385-.0101.02773-.0157.04273l-.0091.0242a5.36326,5.36326,0,0,1-10.44576.0012.3952.3952,0,0,0-.41243-.30135c-.01014,0-.02028-.00346-.03155-.00346H1.94958a1.18954,1.18954,0,0,1,0-2.37837h.41468a.37766.37766,0,0,0,.0631-.00692.39338.39338,0,0,0,.43722-.28171A5.4439,5.4439,0,0,1,8.03,3.1407,5.4438,5.4438,0,0,1,13.1954,7.07539a.39687.39687,0,0,0,.3775.28863c.0124,0,.0237-.00115.0361-.00231.009,0,.0169.00231.0248.00231h.4147a1.18954,1.18954,0,0,1,0,2.37837ZM2.2165,8.15015H1.72069a.40421.40421,0,0,0,0,.80818H2.2165a.40421.40421,0,0,0,0-.80818Zm11.9141,0h-.4958a.40421.40421,0,0,0,0,.80818h.4958a.40421.40421,0,0,0,0-.80818ZM6.37338,7.77827a.45425.45425,0,1,0-.45411.46528A.45917.45917,0,0,0,6.37338,7.77827Zm4.033.46528a.46542.46542,0,1,0-.45413-.46528A.45979.45979,0,0,0,10.4064,8.24355Z" className="sc-iBPRYJ brBpOV"></path>
                                        </svg>
                                    </div>
                                    <h4 className='text-[14px] font-bold mb-0 leading-tight'>Kids</h4>
                                </div>
                                <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="group1" value="value5" />
                            </label>
                            {/* Type #6 */}
                            <label className="flex items-center justify-center cursor-pointer rounded-md px-3 border border-borderClr py-4 p-relative foodTypeRadio">
                                <div className='text-center'>
                                    <div className='mb-3'>
                                        <svg className="mx-auto" height="30" width="30" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.8707,1.12936a3.67924,3.67924,0,0,0-3.625,3.54942h-3.625L3.91217.32267A.37848.37848,0,0,0,3.54128,0L.87519.00442A.38283.38283,0,0,0,.5.39229.38107.38107,0,0,0,.87626.778L3.222.77353l.63534,3.90525H2.13191a.372.372,0,0,0-.27736.12487.39672.39672,0,0,0-.09783.295l.673,8.07461A3.02323,3.02323,0,0,0,5.42475,16H8.87884a3.056,3.056,0,0,0,2.99826-2.8554l.3387-4.56942A3.69789,3.69789,0,0,0,15.5,4.86111a3.68642,3.68642,0,0,0-3.6304-3.73175Zm-.1774,4.32295-.1849,2.48746H5.15061L4.7464,5.45231Zm-7.71018,0,.40422,2.48746H2.749L2.5415,5.45231Zm4.8968,9.77419H5.42582A2.2664,2.2664,0,0,1,3.18007,13.107L2.79521,8.4923H4.47764l.91378,5.6225a.3798.3798,0,0,0,.37089.3227.3812.3812,0,0,0,.372-.4509L5.24092,8.4923H11.4686l-.3408,4.5926a2.29056,2.29056,0,0,1-2.24788,2.1405ZM12.2577,8.01381l.2161-2.91843a.39873.39873,0,0,0-.0989-.29284.36892.36892,0,0,0-.2763-.12376H8.78316a3.13483,3.13483,0,0,1,3.08754-2.9969,3.18482,3.18482,0,0,1,.3881,6.33193Z" className="sc-iBPRYJ brBpOV"></path>
                                        </svg>
                                    </div>
                                    <h4 className='text-[14px] font-bold mb-0 leading-tight'>Beverage</h4>
                                </div>
                                <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="group1" value="value6" />
                            </label>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='flex items-center gap-3'>
                            <div className='md:w-[70%]'>
                                <h3 className='text-lg font-semibold mb-1 leading-tight'>Does this main need a side?</h3>
                                <p className='text-[12px] mb-1'>Let us know if the customer needs to purchase a side item (e.g. rice, bread or a vegatable) separately for this dish.</p>
                            </div>
                            <div className='md:w-[30%]'>
                                {/* <div className="field flex justify-end">
                                    <input className="formSwitch-input" type="checkbox" id="email" name="email" value=" true" />
                                    <label for="email" className="formSwitch">
                                        <span className="formSwitch-label" data-on="Yes" data-off="No"></span>
                                        <span className="formSwitch-handle"></span>
                                    </label>
                                </div> */}
                                <div className='flex items-center justify-end bg-grayBg rounded-lg p-2' id="sideID">
                                    <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                        <div className='flex justify-center items-center w-full'>
                                            <span className="text-base font-semibold">Yes</span>
                                        </div>
                                        <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked name="sideID" value="value1" />
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                        <div className='flex justify-center items-center w-full'>
                                            <span className="text-base font-semibold">No</span>
                                        </div>
                                        <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="sideID" value="value2" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-6 border-b'></div>
                    <div className=''>
                        <h3 className='text-lg font-semibold mb-1 leading-tight'>Spice options</h3>
                        <p className='text-[12px]'>Choose whether the spice level can be customized for this dish.</p>
                        <select id="selectOption">
                            <option value="option1">Yes, spice level can be customized</option>
                            <option value="option2">No, spice level cannot be customized</option>
                        </select>
                    </div>
                    <div className='my-6 border-b'></div>
                    <div className='rounded-lg bg-grayBg p-4'>
                        <h3 className='text-lg font-semibold mb-1 leading-tight'>Dish cuisine tags</h3>
                        <p className='text-[12px]'>
                            Add up to 5 cuisine tags for your dish. You can arrange
                            the tags in the order of importance.
                        </p>
                        <Select
                            isMulti
                            options={options}
                            value={cusineSelectedOptions}
                            onChange={handleCusineSelectChange}
                            placeholder="+ Add geographical cuisine tags"
                        />
                        <ul className='mt-2'>
                            {cusineSelectedOptions.map((option) => (
                                <li className='bg-secondary text-white inline-block rounded-[4px] px-2 mr-2' key={option.value}>{option.label}</li>
                            ))}
                        </ul>
                        <div className='rounded-lg bg-grayBg pt-4'>
                            <div className='flex items-center gap-2'>
                                <svg className="sc-jSgupP ckDfJz" height="17" width="20" viewBox="0 0 20 17" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.5,14.6875a1.27335,1.27335,0,0,0,.15625.5625l.53125.7813a1.10979,1.10979,0,0,0,.84375.4687H10.9375a1.10961,1.10961,0,0,0,.8437-.4687l.5313-.7813a1.2741,1.2741,0,0,0,.1563-.5625V13.5001H7.5ZM9.96875.50029a5.471,5.471,0,0,0-4.125,9.06234,9.00227,9.00227,0,0,1,1.625,2.875v.0312H12.5v-.0312a9.00321,9.00321,0,0,1,1.625-2.875A5.44565,5.44565,0,0,0,9.96875.50029ZM10,3.50024a2.46115,2.46115,0,0,0-2.5,2.4687.53769.53769,0,0,1-.5.5.51392.51392,0,0,1-.5-.5A3.48765,3.48765,0,0,1,10,2.50026a.51392.51392,0,0,1,.5.5A.53769.53769,0,0,1,10,3.50024ZM3.5,6.46893a.76043.76043,0,0,0-.75-.75h-2a.74029.74029,0,0,0-.75.75.72209.72209,0,0,0,.75.75h2A.74029.74029,0,0,0,3.5,6.46893Zm15.75-.75h-2a.74029.74029,0,0,0-.75.75.72209.72209,0,0,0,.75.75h2a.74032.74032,0,0,0,.75-.75A.76046.76046,0,0,0,19.25,5.719ZM4.09375,2.219l-1.75-1a.721.721,0,0,0-.75-.03125.77077.77077,0,0,0-.375.65624.76171.76171,0,0,0,.375.65624l1.75,1a.718.718,0,0,0,.75.03125.84919.84919,0,0,0,.375-.65624A.7617.7617,0,0,0,4.09375,2.219ZM18.375,10.4689l-1.75-1a.718.718,0,0,0-.75-.03125.84934.84934,0,0,0-.375.65627.7618.7618,0,0,0,.375.6562l1.75,1a.70107.70107,0,0,0,1-.2813A.71605.71605,0,0,0,18.375,10.4689Zm-15.03125-1-1.75,1a.7617.7617,0,0,0-.375.6562.77064.77064,0,0,0,.375.6562.72112.72112,0,0,0,.75-.0312l1.75-1a.7437.7437,0,0,0,.25-1A.701.701,0,0,0,3.34375,9.46888ZM16.2812,3.594a.83208.83208,0,0,0,.375-.09375l1.7188-1a.72269.72269,0,0,0,.25-1,.701.701,0,0,0-1-.28125l-1.7187,1a.7569.7569,0,0,0-.375.84374A.77938.77938,0,0,0,16.2812,3.594Z" className="sc-iBPRYJ brBpOV"></path>
                                </svg>
                                <span className='text-base font-semibold'>Tips</span>
                            </div>
                            <ul className='mb-0 mt-2 pl-5'>
                                <li className='list-disc leading-tight mb-1'>Select up to 7 dish tags that best describe this dish.</li>
                                <li className='list-disc leading-tight mb-1'>We’ve included some of the tags from your cuisine profile, remove any that do not apply to this dish.</li>
                                <li className='list-disc leading-tight mb-1'>These selections will help your customers find your dish, so be sure to only select tags that describe it well.</li>
                            </ul>
                        </div>
                    </div>
                    <div className='my-6 border-b'></div>
                    <div className=''>
                        <div className='flex sm:flex-row flex-col justify-between sm:items-center items-start gap-4'>
                            <div>
                                <h3 className='text-lg font-semibold mb-1 leading-tight'>Serving size options</h3>
                                <h4 className='text-base font-normal mb-0 leading-tight'>Base serving size</h4>
                            </div>
                            <button onClick={openServSizeModal} className='bg-primaryDark text-white text-base font-semibold rounded-full px-5 py-2'>Add Base Serving</button>
                        </div>
                        <div className='rounded-lg bg-grayBg p-4 mt-4'>
                            <div className='flex items-center gap-2'>
                                <svg className="sc-jSgupP ckDfJz" height="17" width="20" viewBox="0 0 20 17" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.5,14.6875a1.27335,1.27335,0,0,0,.15625.5625l.53125.7813a1.10979,1.10979,0,0,0,.84375.4687H10.9375a1.10961,1.10961,0,0,0,.8437-.4687l.5313-.7813a1.2741,1.2741,0,0,0,.1563-.5625V13.5001H7.5ZM9.96875.50029a5.471,5.471,0,0,0-4.125,9.06234,9.00227,9.00227,0,0,1,1.625,2.875v.0312H12.5v-.0312a9.00321,9.00321,0,0,1,1.625-2.875A5.44565,5.44565,0,0,0,9.96875.50029ZM10,3.50024a2.46115,2.46115,0,0,0-2.5,2.4687.53769.53769,0,0,1-.5.5.51392.51392,0,0,1-.5-.5A3.48765,3.48765,0,0,1,10,2.50026a.51392.51392,0,0,1,.5.5A.53769.53769,0,0,1,10,3.50024ZM3.5,6.46893a.76043.76043,0,0,0-.75-.75h-2a.74029.74029,0,0,0-.75.75.72209.72209,0,0,0,.75.75h2A.74029.74029,0,0,0,3.5,6.46893Zm15.75-.75h-2a.74029.74029,0,0,0-.75.75.72209.72209,0,0,0,.75.75h2a.74032.74032,0,0,0,.75-.75A.76046.76046,0,0,0,19.25,5.719ZM4.09375,2.219l-1.75-1a.721.721,0,0,0-.75-.03125.77077.77077,0,0,0-.375.65624.76171.76171,0,0,0,.375.65624l1.75,1a.718.718,0,0,0,.75.03125.84919.84919,0,0,0,.375-.65624A.7617.7617,0,0,0,4.09375,2.219ZM18.375,10.4689l-1.75-1a.718.718,0,0,0-.75-.03125.84934.84934,0,0,0-.375.65627.7618.7618,0,0,0,.375.6562l1.75,1a.70107.70107,0,0,0,1-.2813A.71605.71605,0,0,0,18.375,10.4689Zm-15.03125-1-1.75,1a.7617.7617,0,0,0-.375.6562.77064.77064,0,0,0,.375.6562.72112.72112,0,0,0,.75-.0312l1.75-1a.7437.7437,0,0,0,.25-1A.701.701,0,0,0,3.34375,9.46888ZM16.2812,3.594a.83208.83208,0,0,0,.375-.09375l1.7188-1a.72269.72269,0,0,0,.25-1,.701.701,0,0,0-1-.28125l-1.7187,1a.7569.7569,0,0,0-.375.84374A.77938.77938,0,0,0,16.2812,3.594Z" className="sc-iBPRYJ brBpOV"></path>
                                </svg>
                                <span className='text-base font-semibold'>Tips</span>
                            </div>
                            <ul className='mb-0 mt-2 pl-5'>
                                <li className='list-disc leading-tight mb-1'>
                                    Single serving mains and 1 or 1-2 serving sides are our
                                    most popular dishes.
                                </li>
                                <li className='list-disc leading-tight mb-1'>
                                    Your base serving price will be what customers see most often. Make sure it's priced as competitively as possible.
                                </li>
                                <li className='list-disc leading-tight mb-1'>
                                    You can use the price recommendation provided as a guide, we’ve based it off of other top selling dishes in your city.
                                </li>
                                <li className='list-disc leading-tight mb-1'>
                                    Lower-priced dishes with a generous portion size typically sell best, especially for new dishes.
                                </li>
                                <li className='list-disc leading-tight mb-1'>
                                    When dishes are priced too high, customers tend to opt for other items—setting higher prices does not mean that you’ll make more money.
                                </li>
                                <li className='list-disc leading-tight mb-1'>
                                    If you do choose to set your prices above these recommendations, we recommend you make the value clear to your customer.
                                </li>

                            </ul>
                        </div>
                        <div>
                            <ServingSizeModal isOpen={isServSizeModalOpen} onClose={closeServSizeModal} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default DetailStep;
